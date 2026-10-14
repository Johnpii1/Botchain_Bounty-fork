
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../components/UI/Toast";
import {
  FiArrowLeft,
  FiArrowUp,
  FiCheck,
  FiClock,
  FiExternalLink,
  FiInfo,
  FiLink,
  FiShield,
  FiTag,
  FiUsers,
  FiX,
  FiSearch,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";
import { getBountyContract } from "../utils/chains.address";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { formatEther } from "viem";
import { useBounty } from "../hooks/useBounty";
import { formatAmount } from "../utils/format";
import { BountyDetailSkeleton } from "../components/UI/Skeleton";

const BountyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { address } = useAccount();
  const currentChainId = useChainId();
  const { switchChain } = useSwitchChain();

  const {
    claimReward,
    assignSingleWinner,
    assignMultipleWinners,
    useClaimableReward,
    useClaimedStatus,
    fetchBountyIdFromTx,
    isPending: isContractPending,
    isConfirming: isContractConfirming,
  } = useBounty();

  const [bounty, setBounty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [hasUserSubmitted, setHasUserSubmitted] = useState(false);
  const [userSubmission, setUserSubmission] = useState(null);
  const [winnersData, setWinnersData] = useState(null);
  const [offChainClaimable, setOffChainClaimable] = useState("0");
  const [hasUserClaimedOffChain, setHasUserClaimedOffChain] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showDistributeModal, setShowDistributeModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [distributing, setDistributing] = useState(false);
  const [submissionImage, setSubmissionImage] = useState(null);
  const [submissionDescription, setSubmissionDescription] = useState("");
  const [submissionLink, setSubmissionLink] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageSizeWarning, setImageSizeWarning] = useState("");
  const [winnerAddresses, setWinnerAddresses] = useState([]);

  const [enrollmentStatus, setEnrollmentStatus] = useState("checking");
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [selectedWinners, setSelectedWinners] = useState([]);

  // Frontend-only display state
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const fileInputRef = useRef(null);

  const blockchainId =
    bounty?.blockchainId !== null && bounty?.blockchainId !== undefined
      ? Number(bounty.blockchainId)
      : null;

  const { data: onChainClaimable, refetch: refetchClaimable } =
    useClaimableReward(blockchainId, address);

  const { data: onChainClaimed } = useClaimedStatus(blockchainId, address);

  useEffect(() => {
    if (blockchainId && address) refetchClaimable();
  }, [blockchainId, address, refetchClaimable]);

  // Show the scroll-to-top button when the page is scrolled down.
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Return to the previous page when possible.
  const handleGoBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };

  // Live countdown. This does not modify the bounty or call the API.
  useEffect(() => {
    if (!bounty?.deadline) {
      setTimeRemaining(null);
      return;
    }

    const updateCountdown = () => {
      const deadline = new Date(bounty.deadline).getTime();

      if (!Number.isFinite(deadline) || deadline <= Date.now()) {
        setTimeRemaining(null);
        return;
      }

      const difference = deadline - Date.now();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60),
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [bounty?.deadline]);

  /* ---------------- Helpers ---------------- */

  const getHostname = (url) => {
    if (!url) return "";

    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  const winnerAddressesSet = new Set(
    [...(winnersData?.winners || []), ...(winnersData?.claimed || [])].map(
      (w) => w.address.toLowerCase(),
    ),
  );

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";

    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isValidUrl = (value) => {
    if (!value) return "";

    let url;

    try {
      url = new URL(value);
    } catch {
      return "Enter a full URL, e.g. https://github.com/user/repo";
    }

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "Only http:// and https:// links are allowed";
    }

    const hostname = url.hostname;

    if (
      !/^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.(?!-)[A-Za-z0-9-]{1,63}(?<!-))*\.[A-Za-z]{2,}$/.test(
        hostname,
      )
    ) {
      return "Enter a valid domain, e.g. github.com or figma.com";
    }

    return "";
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";

    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const shortenAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  const compressImage = (file, maxWidth = 1024, quality = 0.7) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();

        img.onload = () => {
          let { width, height } = img;

          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          canvas.getContext("2d").drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Image compression failed"));
                return;
              }

              resolve(
                new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                }),
              );
            },
            file.type,
            quality,
          );
        };

        img.onerror = reject;
        img.src = e.target.result;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  /* ---------------- API calls ---------------- */

  const checkUserEnrollment = async (wallet, bountyId) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/user/get-enrollment/${wallet}`,
      );

      return (data.enrollments || []).some((e) => e.bountyId === bountyId);
    } catch {
      return false;
    }
  };

  const checkUserSubmission = async (wallet, bountyId) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/bounty/user/submissions/${wallet}`,
      );

      const existing = (data.submissions || []).find(
        (sub) => String(sub.bountyId) === String(bountyId),
      );

      if (existing) {
        setHasUserSubmitted(true);
        setUserSubmission(existing);
      }
    } catch (err) {
      console.error("Error checking submission:", err);
    }
  };

  const loadWinnersData = async (bountyId) => {
    try {
      const { data } = await axios.get(`${API_URL}/bounty/${bountyId}/winners`);

      setWinnersData(data);

      if (address && data.isDistributed) {
        const { data: c } = await axios.get(
          `${API_URL}/bounty/${bountyId}/claimable/${address}`,
        );

        setOffChainClaimable(c.claimableFormatted || "0");

        const { data: h } = await axios.get(
          `${API_URL}/bounty/${bountyId}/has-claimed/${address}`,
        );

        setHasUserClaimedOffChain(h.hasClaimed);
      }
    } catch (err) {
      console.error("Error loading winners:", err);
    }
  };

  const loadComments = async (bountyId) => {
    try {
      const { data } = await axios.get(`${API_URL}/comments/${bountyId}`);
      setComments(data.comments || []);
    } catch (err) {
      console.error("Error loading comments:", err);
    }
  };

  /* ---------------- Fetch bounty ---------------- */

  useEffect(() => {
    const fetchBounty = async () => {
      if (!id) return;

      setLoading(true);
      setEnrollmentStatus("checking");
      setIsCreator(false);
      setHasUserSubmitted(false);
      setUserSubmission(null);
      setWinnersData(null);
      setOffChainClaimable("0");
      setHasUserClaimedOffChain(false);
      setAllSubmissions([]);
      setSelectedWinners([]);
      setShowFullDescription(false);

      try {
        const { data } = await axios.get(`${API_URL}/bounty/${id}`, {
          params: { wallet: address },
        });

        let bountyData = data.bounty || data;

        if (!bountyData.blockchainId && bountyData.txHash) {
          if (currentChainId !== bountyData.network) {
            try {
              await switchChain({ chainId: bountyData.network });
            } catch {
              showToast.error("Please switch network manually");
              return;
            }
          }

          const fetchedId = await fetchBountyIdFromTx(bountyData.txHash);

          if (fetchedId) {
            await axios.patch(`${API_URL}/bounty/update/${id}`, {
              blockchainId: fetchedId,
            });

            bountyData = {
              ...bountyData,
              blockchainId: fetchedId,
            };
          }
        }

        setBounty(bountyData);
        setAllSubmissions(bountyData.submissions?.items || []);

        if (address) {
          const creator =
            bountyData.creator?.toLowerCase() === address.toLowerCase();

          setIsCreator(creator);

          try {
            const enrolled = await checkUserEnrollment(address, id);
            setEnrollmentStatus(enrolled ? "enrolled" : "not-enrolled");
          } catch {
            setEnrollmentStatus("not-enrolled");
          }

          await checkUserSubmission(address, id);
          await loadWinnersData(id);
        }

        await loadComments(id);
      } catch (err) {
        console.error(err);
        showToast.error("Failed to load bounty details");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchBounty();
  }, [id, navigate, address]);

  /* ---------------- Enrollment ---------------- */

  const submissionLinkError = isValidUrl(submissionLink);

  const handleEnroll = async () => {
    if (!address) {
      return showToast.error("Please connect your wallet");
    }

    setIsEnrolling(true);
    const loadingToast = showToast.loading("Enrolling in bounty...");

    try {
      await axios.post(`${API_URL}/user/enrollment`, {
        bountyId: id,
        user: address,
      });

      showToast.success("Enrolled!", { id: loadingToast });
      setEnrollmentStatus("enrolled");
    } catch (err) {
      const alreadyEnrolled =
        err.response?.status === 400 &&
        err.response.data?.error?.toLowerCase().includes("already");

      if (alreadyEnrolled) {
        showToast.success("You're already enrolled", { id: loadingToast });
        setEnrollmentStatus("enrolled");
      } else {
        showToast.error(err.response?.data?.error || "Enrollment failed", {
          id: loadingToast,
        });
      }
    } finally {
      setIsEnrolling(false);
    }
  };

  /* ---------------- Submission ---------------- */

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setImageSizeWarning("Max 5MB");
    } else {
      setImageSizeWarning("");
    }

    setSubmissionImage(file);

    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address) {
      return showToast.error("Please connect your wallet");
    }

    if (!submissionDescription || !submissionLink) {
      return showToast.error("Please fill in description and link");
    }

    const urlErr = isValidUrl(submissionLink);

    if (urlErr) {
      return showToast.error(urlErr);
    }

    setSubmitting(true);
    const loadingshowToast = showToast.loading("Submitting...");

    try {
      const formData = new FormData();

      formData.append("bountyId", id);
      formData.append("user", address);
      formData.append("description", submissionDescription);
      formData.append("projectLink", submissionLink);

      if (submissionImage) {
        const compressed = await compressImage(submissionImage);
        formData.append("image", compressed);
      }

      const { data } = await axios.post(`${API_URL}/bounty/submit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast.success("Submitted! Pending review.", {
        id: loadingshowToast,
      });

      setHasUserSubmitted(true);

      setUserSubmission({
        ...data,
        bountyId: id,
        user: address,
        description: submissionDescription,
        projectLink: submissionLink,
        status: "pending",
        submittedAt: new Date().toISOString(),
      });

      setShowSubmitModal(false);
      resetSubmissionForm();
    } catch (err) {
      const msg =
        err.response?.status === 400
          ? err.response.data?.error || "Submission rejected"
          : "Failed to submit";

      showToast.error(msg, { id: loadingshowToast });
    } finally {
      setSubmitting(false);
    }
  };

  const resetSubmissionForm = () => {
    setSubmissionImage(null);
    setSubmissionDescription("");
    setSubmissionLink("");
    setImagePreview(null);
    setImageSizeWarning("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* ---------------- Claim ---------------- */

  const handleClaimReward = async () => {
    if (!address) {
      return showToast.error("Please connect your wallet");
    }

    if (!bounty?.blockchainId) {
      return showToast.error("Not on-chain");
    }

    if (currentChainId !== bounty.network) {
      try {
        await switchChain({ chainId: bounty.network });
      } catch {
        return showToast.error("Please switch network manually");
      }
    }

    if (!onChainClaimable || onChainClaimable === 0n) {
      return showToast.error("No reward available");
    }

    if (onChainClaimed) {
      return showToast.error("Already claimed");
    }

    try {
      const { hash } = await claimReward(blockchainId);

      await axios.post(`${API_URL}/bounty/${id}/claim`, {
        winnerAddress: address,
        txHash: hash,
      });

      showToast.success("Reward claimed!");

      await loadWinnersData(id);
      refetchClaimable();
    } catch (err) {
      showToast.error(err.shortMessage || err.message || "Claim failed");
    }
  };

  /* ---------------- Distribute ---------------- */

  const handleDistributeReward = async () => {
    const valid = winnerAddresses.filter((a) => a?.startsWith("0x"));

    if (!valid.length || valid.length !== winnerAddresses.length) {
      return showToast.error("Enter valid winner addresses");
    }

    if (!bounty?.blockchainId) {
      return showToast.error("Not on-chain");
    }

    if (currentChainId !== bounty.network) {
      try {
        await switchChain({ chainId: bounty.network });
      } catch {
        return showToast.error("Please switch network manually");
      }
    }

    setDistributing(true);
    const loadingshowToast = showToast.loading("Distributing...");

    try {
      let tx;

      if (valid.length === 1) {
        tx = await assignSingleWinner(blockchainId, valid[0]);
      } else {
        const pcts =
          bounty.payoutType === "MULTI_PERCENTAGE" ? bounty.percentages : [];

        tx = await assignMultipleWinners(blockchainId, valid, pcts);
      }

      const bountyContract = getBountyContract(bounty.network);

      if (!bountyContract) {
        return showToast.error(
          `Bounty contract not configured for chain ${bounty.network}`,
        );
      }

      await axios.post(`${API_URL}/bounty/${id}/distribute`, {
        txHash: tx.hash,
        blockchainId: Number(bounty.blockchainId),
        chainId: Number(bounty.network),
        bountyContract,
      });

      showToast.success("Distributed!", { id: loadingshowToast });

      setSelectedWinners([]);
      setShowDistributeModal(false);

      await loadWinnersData(id);
      await checkUserSubmission(address, id);
    } catch (err) {
      showToast.error(
        err.shortMessage || err.message || "Distribution failed",
        { id: loadingshowToast },
      );
    } finally {
      setDistributing(false);
    }
  };

  const toggleWinnerSelection = (submission) => {
    const addr = submission.user.toLowerCase();

    setSelectedWinners((prev) => {
      const exists = prev.find((s) => s.address === addr);

      if (exists) {
        return prev.filter((s) => s.address !== addr);
      }

      if (bounty.payoutType === "SINGLE") {
        return [{ address: addr, submissionId: submission._id }];
      }

      if (prev.length >= bounty.winnersAllowed) {
        showToast.error(
          `You can only select ${bounty.winnersAllowed} winner${
            bounty.winnersAllowed > 1 ? "s" : ""
          }`,
        );

        return prev;
      }

      return [...prev, { address: addr, submissionId: submission._id }];
    });
  };

  const isSelected = (addr) =>
    selectedWinners.some((s) => s.address === addr.toLowerCase());

  const hasEnoughSelections = () => {
    if (selectedWinners.length === 0) return true;
    return selectedWinners.length === bounty.winnersAllowed;
  };

  const openDistributeModal = () => {
    if (selectedWinners.length > 0) {
      setWinnerAddresses(selectedWinners.map((s) => s.address));
    } else {
      const count =
        bounty?.payoutType === "SINGLE" ? 1 : bounty?.winnersAllowed || 1;

      setWinnerAddresses(Array(count).fill(""));
    }

    setShowDistributeModal(true);
  };

  /* ---------------- Comments ---------------- */

  const handleAddComment = async () => {
    if (!address) {
      return showToast.error("Please connect your wallet");
    }

    if (!newComment.trim()) {
      return showToast.error("Enter a comment");
    }

    try {
      const { data } = await axios.post(`${API_URL}/comments/add/${id}`, {
        user: address,
        text: newComment.trim(),
      });

      setComments((prev) => [data.comment, ...prev]);
      setNewComment("");

      showToast.success("Comment added");
    } catch (err) {
      showToast.error(err.response?.data?.error || "Failed to add comment");
    }
  };

  /* ---------------- Derived ---------------- */

  const canClaim = () => {
    if (isCreator || hasUserClaimedOffChain) {
      return false;
    }

    const amt = blockchainId
      ? onChainClaimable || 0n
      : BigInt(Math.round(Number(offChainClaimable) * 1e18) || 0);

    if (amt === 0n) return false;

    return true;
  };

  const canDistribute = () => {
    if (!isCreator) return false;

    if (new Date(bounty?.deadline) >= new Date()) {
      return false;
    }

    if (winnersData?.isDistributed) {
      return false;
    }

    return true;
  };

  const displayClaimable = () => {
    if (blockchainId && onChainClaimable) {
      return formatAmount(formatEther(onChainClaimable));
    }

    return formatAmount(offChainClaimable);
  };

  /* ---------------- UI classes ---------------- */

  const cardClass =
    "relative overflow-hidden rounded-3xl border border-[#dedbd1] dark:border-white/10 bg-white dark:bg-[#111311] shadow-[0_18px_60px_rgba(34,31,24,0.07)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)] transition-colors duration-300";

  const inputClass =
    "w-full bg-white dark:bg-[#111311] border border-[#ddd9ce] dark:border-white/10 rounded-xl px-4 py-3 text-[#171714] dark:text-white placeholder:text-[#99958a] dark:placeholder:text-white/35 outline-none transition focus:border-[#00D6A0] dark:focus:border-[#00D6A0] focus:ring-2 focus:ring-[#00D6A0]/10";

  const resourceButtonClass =
    "inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-[#ddd8ca] dark:border-white/10 bg-white dark:bg-[#111311] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#625e55] dark:text-white/75 hover:border-[#00D6A0] hover:text-[#8f6c12] dark:hover:text-[#00D6A0] transition-colors";

  /* ---------------- Loading / Error ---------------- */

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col bg-[#F3F5F3] dark:bg-[#080B0D] text-[#171714] dark:text-white transition-colors duration-300"
        style={{
          backgroundImage: `
            linear-gradient(rgba(112,105,88,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(112,105,88,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "56px 28px",
        }}
      >
        <NavBar />
        <main className="flex-grow pt-20">
          <BountyDetailSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  if (!bounty) {
    return (
      <div
        className="min-h-screen flex flex-col bg-[#F3F5F3] dark:bg-[#080B0D] text-[#171714] dark:text-white transition-colors duration-300"
        style={{
          backgroundImage: `
            linear-gradient(rgba(112,105,88,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(112,105,88,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "56px 28px",
        }}
      >
        <NavBar />

        <main className="flex-grow flex items-center justify-center pt-20 px-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white dark:bg-[#111311] border border-[#dedbd1] dark:border-white/10 flex items-center justify-center text-[#00A87D] dark:text-[#00D6A0]">
              <FiSearch size={28} />
            </div>

            <p className="text-[#171714] dark:text-white text-xl font-semibold">
              Bounty not found
            </p>

            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 px-6 py-3 rounded-xl bg-[#171714] dark:bg-[#00D6A0] text-[#00D6A0] dark:text-[#171714] font-semibold hover:bg-[#292922] dark:hover:bg-[#B8962E] transition"
            >
              Back to Dashboard
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  /* ---------------- Main ---------------- */

  const statusStyles = {
    active:
      "bg-[#e8f5e9] dark:bg-[#18351e] text-[#2e7d32] dark:text-[#81c784] border border-[#a5d6a7] dark:border-[#2e7d32]/40",
    upcoming:
      "bg-[#fff8e1] dark:bg-[#332b12] text-[#a17a17] dark:text-[#00D6A0] border border-[#e5d9b8] dark:border-[#00D6A0]/30",
    ended:
      "bg-[#f2f0ea] dark:bg-[#1a1c1a] text-[#777267] dark:text-white/55 border border-[#ddd8ca] dark:border-white/10",
    completed:
      "bg-[#f4ecd5] dark:bg-[#332b12] text-[#8f6c12] dark:text-[#00D6A0] border border-[#00D6A0] dark:border-[#00D6A0]/50",
    cancelled:
      "bg-[#fbe9e7] dark:bg-[#351b1b] text-[#c62828] dark:text-[#ef9a9a] border border-[#ef9a9a] dark:border-[#c62828]/40",
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#F3F5F3] dark:bg-[#080B0D] text-[#171714] dark:text-white transition-colors duration-300"
      style={{
        backgroundImage: `
          linear-gradient(rgba(112,105,88,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(112,105,88,0.035) 1px, transparent 1px)
        `,
        backgroundSize: "56px 28px",
      }}
    >
      <NavBar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Back navigation */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleGoBack}
              className="group inline-flex items-center gap-2 rounded-xl border border-[#dedbd1] bg-white px-4 py-2.5 text-sm font-semibold text-[#625e55] shadow-sm transition-all duration-300 hover:border-[#00A87D] hover:text-[#008b68] dark:border-white/10 dark:bg-[#111311] dark:text-white/70 dark:hover:border-[#00D6A0] dark:hover:text-[#00D6A0]"
            >
              <FiArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back
            </button>

            <span className="text-xs text-[#8b8579] dark:text-white/40">
              Bounty #{id}
            </span>
          </div>

          {/* Main bounty card */}
          <div className={cardClass}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#00D6A0]" />

            <div className="p-5 sm:p-7 md:p-9">
              {/* Title and status */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#8b8579] dark:text-white/40">
                    <span className="w-2 h-2 rounded-full bg-[#00D6A0]" />
                    Bounty details
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-[#171714] dark:text-white break-words">
                    {bounty.title}
                  </h1>
                </div>

                <span
                  className={`self-start px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${
                    statusStyles[bounty.status] || statusStyles.ended
                  }`}
                >
                  {bounty.status}
                </span>
              </div>

              {/* End-of-bounty banner */}
              {(bounty.status === "completed" || bounty.status === "ended") && (
                <div
                  className={`mb-6 flex items-start gap-3 rounded-2xl border p-4 ${
                    bounty.status === "completed"
                      ? "bg-[#f4ecd5] dark:bg-[#2b2510] border-[#00D6A0] dark:border-[#00D6A0]/50"
                      : "bg-[#f2f0ea] dark:bg-[#1a1c1a] border-[#ddd8ca] dark:border-white/10"
                  }`}
                >
                  <FiCheckCircle
                    size={18}
                    className={`mt-0.5 shrink-0 ${
                      bounty.status === "completed"
                        ? "text-[#8f6c12] dark:text-[#00D6A0]"
                        : "text-[#777267] dark:text-white/55"
                    }`}
                  />

                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        bounty.status === "completed"
                          ? "text-[#8f6c12] dark:text-[#00D6A0]"
                          : "text-[#625e55] dark:text-white/65"
                      }`}
                    >
                      {bounty.status === "completed"
                        ? "This bounty has been completed"
                        : "This bounty has ended"}
                    </p>

                    <p className="text-xs text-[#777267] dark:text-white/55 mt-1 leading-relaxed">
                      {bounty.status === "completed"
                        ? `${bounty.winners?.assigned?.length || 0} winner${
                            (bounty.winners?.assigned?.length || 0) !== 1
                              ? "s"
                              : ""
                          } selected. Rewards have been distributed and can now be claimed by the winners.`
                        : "The submission period has closed. The creator has not yet selected winners."}
                    </p>
                  </div>
                </div>
              )}

              {/* Description with View More */}
              <div className="rounded-2xl bg-[#fbfaf6] dark:bg-[#151715] border border-[#e7e3da] dark:border-white/10 overflow-hidden">
                <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 border-b border-[#e7e3da] dark:border-white/10">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-wider font-semibold text-[#8b8579] dark:text-white/45">
                      About this bounty
                    </p>

                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8f6c12] dark:text-[#00D6A0] border border-[#e5d9b8] dark:border-[#00D6A0]/30 rounded-full px-2.5 py-1 shrink-0">
                      Task details
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <p
                    className={`text-[#625e55] dark:text-white/70 text-sm sm:text-base leading-7 whitespace-pre-wrap break-words ${
                      showFullDescription ? "" : "line-clamp-5"
                    }`}
                  >
                    {bounty.description || "No description provided."}
                  </p>

                  {(bounty.description || "").length > 220 && (
                    <button
                      type="button"
                      onClick={() =>
                        setShowFullDescription((previous) => !previous)
                      }
                      aria-expanded={showFullDescription}
                      className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#e5d9b8] dark:border-[#00D6A0]/30 bg-white dark:bg-[#111311] px-4 py-2.5 text-sm font-semibold text-[#8f6c12] dark:text-[#00D6A0] hover:border-[#00D6A0] transition-colors"
                    >
                      {showFullDescription ? "Show Less" : "View More"}
                      {showFullDescription ? (
                        <FiChevronUp size={16} />
                      ) : (
                        <FiChevronDown size={16} />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Reward and deadline highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                <div className="rounded-2xl border border-[#e5d9b8] dark:border-[#00D6A0]/25 bg-[#f8f3e5] dark:bg-[#17221d] p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8b8579] dark:text-white/45 mb-2">
                    <FiShield size={14} />
                    Total reward
                  </div>

                  <p className="text-2xl sm:text-3xl font-bold text-[#8f6c12] dark:text-[#00D6A0] break-words">
                    {formatAmount(bounty.reward)}{" "}
                    <span className="text-base sm:text-lg">
                      {bounty.token || "USDC"}
                    </span>
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e7e3da] dark:border-white/10 bg-[#fbfaf6] dark:bg-[#151715] p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8b8579] dark:text-white/45">
                      <FiClock size={14} />
                      Submission deadline
                    </div>

                    <span className="rounded-full border border-[#e5d9b8] dark:border-[#00D6A0]/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#8f6c12] dark:text-[#00D6A0] shrink-0">
                      {timeRemaining ? "Time left" : "Deadline"}
                    </span>
                  </div>

                  <p className="text-xl sm:text-2xl font-bold text-[#171714] dark:text-white">
                    {formatDate(bounty.deadline)}
                  </p>

                  {timeRemaining ? (
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {[
                        { label: "Days", value: timeRemaining.days },
                        { label: "Hours", value: timeRemaining.hours },
                        { label: "Minutes", value: timeRemaining.minutes },
                        { label: "Seconds", value: timeRemaining.seconds },
                      ].map((unit) => (
                        <div
                          key={unit.label}
                          className="min-w-0 rounded-xl border border-[#e5d9b8] dark:border-[#00D6A0]/25 bg-white dark:bg-[#111311] p-2 text-center"
                        >
                          <p className="text-lg sm:text-xl font-bold tabular-nums text-[#8f6c12] dark:text-[#00D6A0]">
                            {String(unit.value).padStart(2, "0")}
                          </p>

                          <p className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-wide text-[#8b8579] dark:text-white/45">
                            {unit.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#ddd8ca] dark:border-white/10 bg-white dark:bg-[#111311] px-3 py-2.5">
                      <FiClock
                        size={15}
                        className="text-[#8b8579] dark:text-white/45 shrink-0"
                      />

                      <p className="text-xs sm:text-sm text-[#777267] dark:text-white/55">
                        {bounty.deadline &&
                        new Date(bounty.deadline).getTime() <= Date.now()
                          ? "The submission deadline has passed."
                          : "No active countdown available."}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="my-6 border-t border-[#e7e3da] dark:border-white/10" />

              {/* Details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-[#8b8579] dark:text-white/40 mb-1.5">
                    Creator
                  </p>

                  <p className="text-[#171714] dark:text-white/75 font-mono text-sm break-all">
                    {shortenAddress(bounty.creator)}
                  </p>
                </div>

                {/* Bordered category */}
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-[#8b8579] dark:text-white/40 mb-2">
                    Category
                  </p>

                  <div className="inline-flex max-w-full items-center gap-2 rounded-xl border border-[#e5d9b8] dark:border-[#00D6A0]/30 bg-[#f8f3e5] dark:bg-[#17221d] px-3.5 py-2.5">
                    <FiTag
                      size={15}
                      className="shrink-0 text-[#8f6c12] dark:text-[#00D6A0]"
                    />

                    <span className="text-sm font-semibold text-[#8f6c12] dark:text-[#00D6A0] break-words">
                      {bounty.category || "Uncategorized"}
                    </span>
                  </div>
                </div>

                {/* Bordered winner type */}
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-[#8b8579] dark:text-white/40 mb-2">
                    Winner type
                  </p>

                  <div className="inline-flex max-w-full items-center gap-2 rounded-xl border border-[#e5d9b8] dark:border-[#00D6A0]/30 bg-[#f8f3e5] dark:bg-[#17221d] px-3.5 py-2.5">
                    <FiUsers
                      size={15}
                      className="shrink-0 text-[#8f6c12] dark:text-[#00D6A0]"
                    />

                    <span className="text-sm font-semibold text-[#8f6c12] dark:text-[#00D6A0] break-words">
                      {bounty.payoutType === "SINGLE"
                        ? "Single winner"
                        : bounty.payoutType === "MULTI_EQUAL"
                          ? `Equal split · ${bounty.winnersAllowed} winner${
                              bounty.winnersAllowed > 1 ? "s" : ""
                            }`
                          : bounty.payoutType === "MULTI_PERCENTAGE"
                            ? `Custom split · ${bounty.winnersAllowed} winner${
                                bounty.winnersAllowed > 1 ? "s" : ""
                              }`
                            : "—"}
                    </span>
                  </div>
                </div>

                {bounty.tags?.length > 0 && (
                  <div className="sm:col-span-2 lg:col-span-3">
                    <p className="text-xs uppercase tracking-wider text-[#8b8579] dark:text-white/40 mb-2">
                      Tags
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {bounty.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 rounded-full bg-[#f4ecd5] dark:bg-[#2b2510] border border-[#e5d9b8] dark:border-[#00D6A0]/30 text-[#8f6c12] dark:text-[#00D6A0] font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-[#8b8579] dark:text-white/40 mb-1.5">
                    Project link
                  </p>

                  {bounty.originLink ? (
                    <a
                      href={bounty.originLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex max-w-full items-center gap-2 text-[#9a7619] dark:text-[#00D6A0] hover:underline text-sm"
                      title={bounty.originLink}
                    >
                      <FiLink size={13} className="shrink-0" />
                      <span className="truncate">
                        {getHostname(bounty.originLink)}
                      </span>
                      <FiExternalLink size={12} className="shrink-0" />
                    </a>
                  ) : (
                    <p className="text-[#99958a] dark:text-white/35 text-sm">
                      No link provided
                    </p>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-5 border-t border-[#e7e3da] dark:border-white/10">
                {!isCreator && bounty.status === "active" && (
                  <>
                    {enrollmentStatus === "checking" && (
                      <div className="px-5 py-3 rounded-xl bg-[#f2f0ea] dark:bg-[#151715] border border-[#dedad0] dark:border-white/10 text-[#aaa59b] dark:text-white/40 text-sm text-center">
                        Checking enrollment...
                      </div>
                    )}

                    {enrollmentStatus === "not-enrolled" && (
                      <button
                        onClick={handleEnroll}
                        disabled={isEnrolling}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#00D6A0] dark:bg-[#e0bd45] text-[#171714] font-semibold hover:bg-[#00D6A0] dark:hover:bg-[#d2ac2f] transition-colors duration-300 disabled:opacity-50"
                      >
                        {isEnrolling ? "Enrolling..." : "Start Task"}
                      </button>
                    )}

                    {enrollmentStatus === "enrolled" && !hasUserSubmitted && (
                      <button
                        onClick={() => setShowSubmitModal(true)}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white dark:bg-[#151715] border border-[#d8d3c6] dark:border-white/10 text-[#292720] dark:text-white font-semibold hover:border-[#00D6A0] dark:hover:border-[#00D6A0]/60 transition-colors duration-300"
                      >
                        Submit Task
                      </button>
                    )}
                  </>
                )}

                {canClaim() && (
                  <button
                    onClick={handleClaimReward}
                    disabled={isContractPending || isContractConfirming}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#171714] dark:bg-[#00D6A0] text-[#00D6A0] dark:text-[#171714] font-semibold hover:bg-[#292922] dark:hover:bg-[#B8962E] transition disabled:opacity-50"
                  >
                    {isContractPending
                      ? "Confirm in wallet..."
                      : isContractConfirming
                        ? "Confirming..."
                        : `Claim ${displayClaimable()} ${bounty.token}`}
                  </button>
                )}

                {canDistribute() && (
                  <button
                    onClick={openDistributeModal}
                    disabled={!hasEnoughSelections()}
                    title={
                      hasEnoughSelections()
                        ? ""
                        : `Select exactly ${bounty.winnersAllowed} winner${
                            bounty.winnersAllowed > 1 ? "s" : ""
                          }`
                    }
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#00D6A0] dark:bg-[#e0bd45] text-[#171714] font-semibold hover:bg-[#00D6A0] dark:hover:bg-[#d2ac2f] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Distribute Reward
                    {selectedWinners.length > 0 && (
                      <span className="ml-2 text-xs">
                        ({selectedWinners.length}/{bounty.winnersAllowed})
                      </span>
                    )}
                  </button>
                )}

                {hasUserSubmitted && userSubmission && (
                  <div className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#f4ecd5] dark:bg-[#2b2510] border border-[#e5d9b8] dark:border-[#00D6A0]/30 text-[#8f6c12] dark:text-[#00D6A0] text-xs font-semibold flex items-center justify-center gap-2">
                    {userSubmission.status === "pending" && (
                      <>
                        <FiClock size={14} />
                        Submission Pending
                      </>
                    )}

                    {userSubmission.status === "accepted" && (
                      <>
                        <FiCheck size={14} />
                        Accepted
                      </>
                    )}

                    {userSubmission.status === "rejected" && (
                      <>
                        <FiX size={14} />
                        Not Selected
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Creator: distribution unlock note */}
              {isCreator && !winnersData?.isDistributed && (
                <div className="mt-5 rounded-2xl bg-[#f7f5ed] dark:bg-[#151715] border border-[#e7e1d2] dark:border-white/10 p-4">
                  <div className="flex items-start gap-3">
                    <FiInfo
                      className="text-[#00A87D] dark:text-[#00D6A0] mt-0.5 shrink-0"
                      size={16}
                    />

                    <div className="space-y-1.5">
                      <p className="text-xs leading-relaxed text-[#777267] dark:text-white/55">
                        <strong className="text-[#8f6c12] dark:text-[#00D6A0]">
                          Distribution unlocks after the deadline.
                        </strong>{" "}
                        You'll be able to select winners and distribute the
                        reward once the bounty reaches{" "}
                        {new Date(bounty.deadline).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                        .
                      </p>

                      {timeRemaining && (
                        <p className="text-xs leading-relaxed text-[#99958a] dark:text-white/45">
                          Time remaining:{" "}
                          {timeRemaining.days > 0 &&
                            `${timeRemaining.days} day${
                              timeRemaining.days !== 1 ? "s" : ""
                            } `}
                          {timeRemaining.hours}h {timeRemaining.minutes}m{" "}
                          {timeRemaining.seconds}s
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Submission closed note */}
              {!isCreator &&
                (bounty.status === "ended" || bounty.status === "completed") &&
                !hasUserSubmitted && (
                  <p className="mt-4 text-xs text-[#99958a] dark:text-white/45">
                    {bounty.status === "completed"
                      ? "This bounty has been completed. The submission period is closed."
                      : "The submission period has closed. You can no longer submit to this bounty."}
                  </p>
                )}
            </div>
          </div>

          {/* Your submission */}
          {hasUserSubmitted && userSubmission && (
            <div className={cardClass}>
              <div className="p-5 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#f4ecd5] dark:bg-[#2b2510] border border-[#e5d9b8] dark:border-[#00D6A0]/30 flex items-center justify-center text-[#8f6c12] dark:text-[#00D6A0]">
                      <FiCheckCircle size={19} />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#171714] dark:text-white">
                        Your Submission
                      </h3>
                      <p className="text-xs text-[#8b8579] dark:text-white/45 mt-0.5">
                        Your submitted work and proof
                      </p>
                    </div>
                  </div>

                  <span className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border border-[#e5d9b8] dark:border-[#00D6A0]/30 bg-[#f4ecd5] dark:bg-[#2b2510] text-[#8f6c12] dark:text-[#00D6A0]">
                    {userSubmission.status === "accepted" ? (
                      <FiCheck size={13} />
                    ) : userSubmission.status === "rejected" ? (
                      <FiX size={13} />
                    ) : (
                      <FiClock size={13} />
                    )}

                    {userSubmission.status === "accepted"
                      ? "Accepted"
                      : userSubmission.status === "rejected"
                        ? "Not selected"
                        : "Pending review"}
                  </span>
                </div>

                <div className="rounded-2xl border border-[#e7e3da] dark:border-white/10 bg-[#fbfaf6] dark:bg-[#151715] p-4 sm:p-5">
                  <p className="text-xs uppercase tracking-wider text-[#8b8579] dark:text-white/40 mb-2">
                    Description
                  </p>

                  <p className="text-sm text-[#4f4b43] dark:text-white/70 leading-6 whitespace-pre-wrap break-words">
                    {userSubmission.description || "No description provided."}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wider text-[#8b8579] dark:text-white/40 mb-2">
                    Submission resources
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {userSubmission.projectLink && (
                      <a
                        href={userSubmission.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={userSubmission.projectLink}
                        className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#e7e3da] dark:border-white/10 bg-white dark:bg-[#151715] p-3 hover:border-[#00D6A0] dark:hover:border-[#00D6A0]/50 transition-colors"
                      >
                        <div className="w-10 h-10 shrink-0 rounded-lg bg-[#f4ecd5] dark:bg-[#2b2510] flex items-center justify-center text-[#8f6c12] dark:text-[#00D6A0]">
                          <FiLink size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[#171714] dark:text-white">
                            Proof link
                          </p>
                          <p className="text-xs text-[#8b8579] dark:text-white/45 truncate mt-0.5">
                            {getHostname(userSubmission.projectLink)}
                          </p>
                        </div>

                        <FiExternalLink
                          size={15}
                          className="shrink-0 text-[#8b8579] dark:text-white/45 group-hover:text-[#00A87D] dark:group-hover:text-[#00D6A0]"
                        />
                      </a>
                    )}

                    {userSubmission.image && (
                      <a
                        href={userSubmission.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#e7e3da] dark:border-white/10 bg-white dark:bg-[#151715] p-3 hover:border-[#00D6A0] dark:hover:border-[#00D6A0]/50 transition-colors"
                      >
                        <div className="w-10 h-10 shrink-0 rounded-lg bg-[#f4ecd5] dark:bg-[#2b2510] flex items-center justify-center text-[#8f6c12] dark:text-[#00D6A0]">
                          <FiExternalLink size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[#171714] dark:text-white">
                            Submission image
                          </p>
                          <p className="text-xs text-[#8b8579] dark:text-white/45 mt-0.5">
                            Open image proof
                          </p>
                        </div>

                        <FiExternalLink
                          size={15}
                          className="shrink-0 text-[#8b8579] dark:text-white/45 group-hover:text-[#00A87D] dark:group-hover:text-[#00D6A0]"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Winners */}
          {winnersData?.isDistributed && winnersData.winners.length > 0 && (
            <div className={cardClass}>
              <div className="p-5 sm:p-6 md:p-8">
                <h3 className="font-bold text-[#171714] dark:text-white mb-4 flex items-center gap-2">
                  <FiUsers className="text-[#00A87D] dark:text-[#00D6A0]" />
                  Rewards Distributed
                </h3>

                <div className="space-y-3">
                  {winnersData.winners.map((winner, idx) => {
                    const isCurrentUser =
                      address &&
                      winner.address.toLowerCase() === address.toLowerCase();

                    const isClaimed = winnersData.claimed?.some(
                      (c) =>
                        c.address.toLowerCase() ===
                        winner.address.toLowerCase(),
                    );

                    return (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 py-3 border-b border-[#e7e3da] dark:border-white/10 last:border-0"
                      >
                        <span className="font-mono text-xs text-[#625e55] dark:text-white/55 break-all">
                          {shortenAddress(winner.address)}
                        </span>

                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-[#8f6c12] dark:text-[#00D6A0] font-semibold text-sm">
                            {formatAmount(winner.amount)} {bounty.token}
                          </span>

                          {isClaimed ? (
                            <span className="text-[#2e7d32] dark:text-[#81c784] text-xs font-semibold flex items-center gap-1">
                              <FiCheck size={12} />
                              Claimed
                            </span>
                          ) : isCurrentUser ? (
                            <span className="text-[#8f6c12] dark:text-[#00D6A0] text-xs font-semibold flex items-center gap-1">
                              <FiClock size={12} />
                              Ready to claim
                            </span>
                          ) : (
                            <span className="text-[#99958a] dark:text-white/35 text-xs flex items-center gap-1">
                              <FiClock size={12} />
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* All submissions */}
          {allSubmissions.length > 0 && (
            <div className={cardClass}>
              <div className="p-5 sm:p-6 md:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-[#171714] dark:text-white flex items-center gap-2">
                      <FiUsers className="text-[#00A87D] dark:text-[#00D6A0]" />
                      Submissions ({allSubmissions.length})
                    </h3>

                    <p className="mt-1 text-sm text-[#777267] dark:text-white/50">
                      {isCreator
                        ? `Review entries submitted by participants and select the winner${
                            bounty.winnersAllowed > 1 ? "s" : ""
                          }.`
                        : "Participants who have submitted to this bounty."}
                    </p>
                  </div>

                  {isCreator && selectedWinners.length > 0 && (
                    <span className="w-fit whitespace-nowrap text-xs font-semibold text-[#8f6c12] dark:text-[#00D6A0] bg-[#f4ecd5] dark:bg-[#2b2510] border border-[#e5d9b8] dark:border-[#00D6A0]/30 px-3 py-1.5 rounded-full">
                      {selectedWinners.length} / {bounty.winnersAllowed}{" "}
                      selected
                    </span>
                  )}
                </div>

                {isCreator &&
                  selectedWinners.length > 0 &&
                  bounty.payoutType === "MULTI_PERCENTAGE" &&
                  bounty.percentages?.length > 0 && (
                    <div className="mb-5 p-4 rounded-2xl bg-[#fbfaf6] dark:bg-[#151715] border border-[#e7e3da] dark:border-white/10">
                      <p className="text-xs uppercase tracking-wider text-[#8b8579] dark:text-white/40 mb-2">
                        Selection order (maps to percentages)
                      </p>

                      <div className="space-y-2">
                        {selectedWinners.map((s, idx) => (
                          <div
                            key={s.address}
                            className="flex justify-between gap-3 text-xs text-[#4f4b43] dark:text-white/65"
                          >
                            <span className="font-mono">
                              {idx + 1}. {shortenAddress(s.address)}
                            </span>

                            <span className="font-semibold text-[#8f6c12] dark:text-[#00D6A0]">
                              {bounty.percentages[idx]}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {allSubmissions.map((submission) => {
                    const selected = isCreator && isSelected(submission.user);

                    const isWinner = winnerAddressesSet.has(
                      submission.user.toLowerCase(),
                    );

                    const selectionIndex = selectedWinners.findIndex(
                      (s) => s.address === submission.user.toLowerCase(),
                    );

                    const isCurrentUser =
                      address &&
                      submission.user.toLowerCase() === address.toLowerCase();

                    return (
                      <div
                        key={submission._id}
                        className={`flex min-w-0 flex-col rounded-2xl border p-3 sm:p-4 transition ${
                          selected
                            ? "bg-[#fbf7e9] dark:bg-[#2b2510] border-[#00D6A0] dark:border-[#00D6A0]/60 shadow-[0_8px_28px_rgba(0,214,160,0.08)]"
                            : "bg-[#fbfaf6] dark:bg-[#151715] border-[#e7e3da] dark:border-white/10 hover:border-[#00D6A0]/60 dark:hover:border-[#00D6A0]/40"
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="font-mono text-sm text-[#171714] dark:text-white font-semibold">
                              {shortenAddress(submission.user)}
                            </span>

                            {isWinner && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#8f6c12] dark:text-[#00D6A0] bg-[#f4ecd5] dark:bg-[#2b2510] border border-[#00D6A0] dark:border-[#00D6A0]/50 px-2 py-0.5 rounded-full">
                                <FiCheckCircle size={10} />
                                Winner
                              </span>
                            )}

                            {isCurrentUser && (
                              <span className="text-[10px] font-bold text-[#8f6c12] dark:text-[#00D6A0] bg-[#f4ecd5] dark:bg-[#332b12] border border-[#e5d9b8] dark:border-[#00D6A0]/30 px-2 py-0.5 rounded-full">
                                YOU
                              </span>
                            )}

                            {selected && (
                              <span className="text-[10px] font-bold text-[#8f6c12] dark:text-[#00D6A0] bg-[#f4ecd5] dark:bg-[#332b12] border border-[#e5d9b8] dark:border-[#00D6A0]/30 px-2 py-0.5 rounded-full">
                                #{selectionIndex + 1}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-[#8b8579] dark:text-white/40 mb-3">
                            {formatDateTime(submission.submittedAt)}
                          </p>

                          {isCreator && (
                            <>
                              <div className="rounded-xl border border-[#e7e3da] dark:border-white/10 bg-white/70 dark:bg-black/10 p-3">
                                <p className="text-[10px] uppercase tracking-wider text-[#8b8579] dark:text-white/40 mb-2">
                                  Work description
                                </p>

                                <p className="text-sm text-[#4f4b43] dark:text-white/70 leading-6 whitespace-pre-wrap break-words">
                                  {submission.description ||
                                    "No description provided."}
                                </p>
                              </div>

                              {(submission.projectLink || submission.image) && (
                                <div className="mt-3 grid grid-cols-1 gap-2">
                                  {submission.projectLink && (
                                    <a
                                      href={submission.projectLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      title={submission.projectLink}
                                      className={`${resourceButtonClass} w-full`}
                                    >
                                      <FiLink
                                        size={15}
                                        className="shrink-0 text-[#9a7619] dark:text-[#00D6A0]"
                                      />

                                      <span className="truncate">
                                        {getHostname(submission.projectLink)}
                                      </span>

                                      <FiExternalLink
                                        size={13}
                                        className="shrink-0"
                                      />
                                    </a>
                                  )}

                                  {submission.image && (
                                    <a
                                      href={submission.image}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`${resourceButtonClass} w-full`}
                                    >
                                      <FiExternalLink
                                        size={15}
                                        className="shrink-0 text-[#9a7619] dark:text-[#00D6A0]"
                                      />

                                      <span>View image</span>
                                    </a>
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        {isCreator && (
                          <div className="mt-4 pt-3 border-t border-[#e7e3da] dark:border-white/10">
                            <p className="text-xs text-[#8b8579] dark:text-white/40 mb-3">
                              {selected
                                ? `Winner selection #${selectionIndex + 1}`
                                : "Review this submission before selecting."}
                            </p>

                            <button
                              onClick={() => toggleWinnerSelection(submission)}
                              className={`w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                                selected
                                  ? "bg-[#171714] dark:bg-[#00D6A0] text-[#00D6A0] dark:text-[#171714] border border-[#171714] dark:border-[#00D6A0]"
                                  : "bg-white dark:bg-[#1b1e1b] border border-[#d8d3c6] dark:border-white/15 text-[#4f4b43] dark:text-white/75 hover:border-[#00D6A0] dark:hover:border-[#00D6A0] hover:text-[#8f6c12] dark:hover:text-[#00D6A0]"
                              }`}
                            >
                              {selected ? (
                                <>
                                  <FiCheck size={14} />
                                  Selected as winner
                                </>
                              ) : (
                                "Select winner"
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {isCreator && selectedWinners.length > 0 && (
                  <button
                    onClick={() => setSelectedWinners([])}
                    className="mt-5 text-xs text-[#8b8579] dark:text-white/45 hover:text-[#c62828] dark:hover:text-[#ef9a9a] transition"
                  >
                    Clear selection
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Comments */}
          <div className={cardClass}>
            <div className="p-5 sm:p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#f4ecd5] dark:bg-[#2b2510] flex items-center justify-center text-[#8f6c12] dark:text-[#00D6A0]">
                  <FiUsers size={17} />
                </div>

                <div>
                  <h3 className="font-bold text-[#171714] dark:text-white">
                    Comments
                  </h3>
                  <p className="text-xs text-[#8b8579] dark:text-white/40">
                    Join the conversation
                  </p>
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
                {comments.length === 0 ? (
                  <p className="text-[#99958a] dark:text-white/35 text-center py-6 text-sm">
                    No comments yet. Start the conversation.
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment._id || comment.id}
                      className="p-3 sm:p-4 bg-[#fbfaf6] dark:bg-[#151715] border border-[#e7e3da] dark:border-white/10 rounded-xl"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                        <span className="font-semibold text-[#8f6c12] dark:text-[#00D6A0] text-sm">
                          {shortenAddress(comment.user)}
                        </span>

                        <span className="text-xs text-[#99958a] dark:text-white/35">
                          {formatDateTime(comment.createdAt || comment.timestamp)}
                        </span>
                      </div>

                      <p className="text-[#4f4b43] dark:text-white/65 text-sm leading-6 whitespace-pre-wrap break-words">
                        {comment.text}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                  placeholder="Add a comment..."
                  className={inputClass}
                />

                <button
                  onClick={handleAddComment}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#171714] dark:bg-[#00D6A0] text-[#00D6A0] dark:text-[#171714] font-semibold hover:bg-[#292922] dark:hover:bg-[#B8962E] transition"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Submit modal */}
      {showSubmitModal && (
        <div
          className="app-modal-overlay fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowSubmitModal(false);
            resetSubmissionForm();
          }}
        >
          <div
            className="app-modal-panel bg-[#f9f8f3] dark:bg-[#111311] border border-[#ddd8ca] dark:border-white/10 rounded-3xl w-full max-w-md p-5 sm:p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-[#171714] dark:text-white">
                Submit Task
              </h2>

              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  resetSubmissionForm();
                }}
                className="w-9 h-9 rounded-xl border border-[#ddd8ca] dark:border-white/10 bg-white dark:bg-[#151715] flex items-center justify-center text-[#777267] dark:text-white/50 hover:text-[#171714] dark:hover:text-white hover:border-[#00D6A0] dark:hover:border-[#00D6A0]/50 transition"
              >
                <FiX size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6f6a60] dark:text-white/45 mb-2">
                  Upload Image (Max 5MB)
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full bg-white dark:bg-[#151715] border border-[#ddd8ca] dark:border-white/10 rounded-xl px-4 py-3 text-[#171714] dark:text-white text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:bg-[#171714] dark:file:bg-[#00D6A0] file:text-[#00D6A0] dark:file:text-[#171714] file:border-0 file:font-semibold"
                />

                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-32 max-w-full rounded-xl border border-[#ddd8ca] dark:border-white/10 object-contain"
                    />

                    {imageSizeWarning && (
                      <p className="text-xs text-[#c62828] dark:text-[#ef9a9a] mt-1">
                        {imageSizeWarning}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6f6a60] dark:text-white/45 mb-2">
                  Description
                </label>

                <textarea
                  value={submissionDescription}
                  onChange={(e) => setSubmissionDescription(e.target.value)}
                  placeholder="What did you do?"
                  rows={4}
                  maxLength={5000}
                  className={`${inputClass} resize-none leading-relaxed`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6f6a60] dark:text-white/45 mb-2">
                  Proof Link
                </label>

                <input
                  type="url"
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  placeholder="https://github.com/... or https://figma.com/..."
                  className={`${inputClass} ${
                    submissionLinkError
                      ? "!border-red-500/60 focus:!border-red-500 focus:!ring-1 focus:!ring-red-500/50"
                      : ""
                  }`}
                />

                {submissionLinkError && submissionLink.length > 0 && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {submissionLinkError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-[#171714] dark:bg-[#00D6A0] text-[#00D6A0] dark:text-[#171714] font-semibold hover:bg-[#292922] dark:hover:bg-[#B8962E] transition disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Distribute modal */}
      {showDistributeModal && bounty && (
        <div
          className="app-modal-overlay fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setShowDistributeModal(false)}
        >
          <div
            className="app-modal-panel bg-[#f9f8f3] dark:bg-[#111311] border border-[#ddd8ca] dark:border-white/10 rounded-3xl w-full max-w-md p-5 sm:p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-[#171714] dark:text-white">
                Distribute Reward
              </h3>

              <button
                onClick={() => setShowDistributeModal(false)}
                className="w-9 h-9 rounded-xl border border-[#ddd8ca] dark:border-white/10 bg-white dark:bg-[#151715] flex items-center justify-center text-[#777267] dark:text-white/50 hover:text-[#171714] dark:hover:text-white hover:border-[#00D6A0] dark:hover:border-[#00D6A0]/50 transition"
              >
                <FiX size={16} />
              </button>
            </div>

            <p className="text-[#625e55] dark:text-white/60 text-sm mb-1">
              Bounty:{" "}
              <strong className="text-[#171714] dark:text-white">
                {bounty.title}
              </strong>
            </p>

            <p className="text-[#625e55] dark:text-white/60 text-sm mb-5">
              Reward:{" "}
              <strong className="text-[#8f6c12] dark:text-[#00D6A0]">
                {formatAmount(bounty.reward)} {bounty.token}
              </strong>
            </p>

            <div className="space-y-4 mb-5">
              {winnerAddresses.map((addr, idx) => {
                let amount = 0;

                if (bounty.payoutType === "MULTI_EQUAL") {
                  amount = bounty.reward / bounty.winnersAllowed;
                } else if (
                  bounty.payoutType === "MULTI_PERCENTAGE" &&
                  bounty.percentages?.[idx]
                ) {
                  amount = (bounty.reward * bounty.percentages[idx]) / 100;
                } else {
                  amount = bounty.reward;
                }

                return (
                  <div key={idx}>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6f6a60] dark:text-white/45 mb-2">
                      Winner {idx + 1} Address
                    </label>

                    <input
                      type="text"
                      value={addr}
                      onChange={(e) => {
                        const next = [...winnerAddresses];
                        next[idx] = e.target.value;
                        setWinnerAddresses(next);
                      }}
                      placeholder="0x..."
                      className={inputClass}
                    />

                    {amount > 0 && (
                      <p className="text-[#8f6c12] dark:text-[#00D6A0] text-xs mt-1.5">
                        Will receive: {formatAmount(amount)} {bounty.token}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowDistributeModal(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-[#151715] border border-[#d9d4c8] dark:border-white/10 text-[#555047] dark:text-white/70 font-semibold hover:bg-[#f4f2ec] dark:hover:bg-[#1b1e1b] transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDistributeReward}
                disabled={
                  distributing || isContractPending || isContractConfirming
                }
                className="flex-1 px-4 py-3 rounded-xl bg-[#171714] dark:bg-[#00D6A0] text-[#00D6A0] dark:text-[#171714] font-semibold hover:bg-[#292922] dark:hover:bg-[#B8962E] transition disabled:opacity-50"
              >
                {distributing ? "Distributing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* Floating scroll-to-top button */}
      <button
        type="button"
        onClick={handleScrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
        className={`fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#00A87D]/30 bg-white text-[#008b68] shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00A87D] hover:bg-[#f4fbf8] dark:border-[#00D6A0]/30 dark:bg-[#151715] dark:text-[#00D6A0] dark:hover:border-[#00D6A0] dark:hover:bg-[#17221d] ${
          showScrollTop
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <FiArrowUp size={21} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default BountyDetail;
