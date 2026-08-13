import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, X, Check, User } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [bio, setBio] = useState("");
  const [expertise, setExpertise] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (showCamera) {
      setCameraError(null);
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      }).catch((err) => {
        console.error("Error accessing camera:", err);
        setCameraError("Could not access camera. Please check permissions.");
        setShowCamera(false);
      });
    } else {
        if (videoRef.current && videoRef.current.srcObject) {
            (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        }
    }
  }, [showCamera]);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0, 300, 300);
            setAvatar(canvasRef.current.toDataURL('image/png'));
            setShowCamera(false);
        }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 z-50" />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest rounded-xl p-6 w-full max-w-lg border border-outline-subtle shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Edit Profile</h2>
                <button onClick={onClose}><X className="w-6 h-6 text-on-surface-variant" /></button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center overflow-hidden border border-outline-subtle">
                  {avatar ? <img src={avatar} alt="Avatar" /> : <User className="w-10 h-10 text-outline" />}
                </div>
                <button onClick={() => setShowCamera(true)} className="flex items-center gap-2 text-primary font-semibold">
                    <Camera className="w-5 h-5" /> Take Photo
                </button>
              </div>

              {cameraError && (
                <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-lg">
                  {cameraError}
                </div>
              )}

              {showCamera && (
                <div className="mb-6">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-64 rounded-lg bg-black mb-2" />
                    <button onClick={takePhoto} className="w-full bg-primary text-white py-2 rounded-lg">Capture</button>
                    <canvas ref={canvasRef} width={300} height={300} className="hidden" />
                </div>
              )}

              <div className="space-y-4">
                <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Bio" className="w-full p-3 rounded-lg border border-outline-subtle" />
                <input value={expertise} onChange={e => setExpertise(e.target.value)} placeholder="Expertise (e.g., Balayage, Skincare)" className="w-full p-3 rounded-lg border border-outline-subtle" />
                <input value={workingHours} onChange={e => setWorkingHours(e.target.value)} placeholder="Working Hours (e.g., Mon-Fri 9-6)" className="w-full p-3 rounded-lg border border-outline-subtle" />
              </div>

              <button onClick={onClose} className="w-full mt-6 bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2">
                <Check className="w-5 h-5" /> Save Changes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
