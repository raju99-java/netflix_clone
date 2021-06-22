import { useState } from "react";
/* Learn Higher Order components*/

export default function useVideoState() {
  const [videoState, setVideoState] = useState({
    isMuted: false,
    isLiked: false,
    isDisliked: false,
    isFavorited: false
  });

  return [videoState, setVideoState];
}
