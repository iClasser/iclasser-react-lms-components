// import style from './style.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import "./style.module.css";
import {
  faPlay,
  faPlayCircle,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import lottie from "lottie-web";

const styles = {
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
};

export interface LottieBlockPreviewStructureProps {
  textId?: string;
  props: {
    url: string;
    loop: boolean;
  };
  [key: string]: any;
}

export interface LottieBlockPreviewProps {
  componentIndex: number;
  textData?: any;
  structureComponent: LottieBlockPreviewStructureProps;
  codingContents?: any;
}

const Preview = (props: LottieBlockPreviewProps) => {
  const {
    // componentIndex,
    textData,
    structureComponent,
    codingContents,
  } = props;
  const { textId, props: compProps } = structureComponent;
  const [started, setStarted] = useState(false);
  const lottieInstance = useRef(null);

  const { url, loop } = compProps;

  if (!url) {
    return null;
  }

  return (
    <div className="mt-5 mb-5 border rounded-md border-gray-300 bg-gray-200 p-1">
      {url && (
        <LottiePlayerComponent
          originalUri={url}
          lottieInstance={lottieInstance}
          started={started}
          loop={loop}
        />
      )}
    </div>
  );
};

interface LottiePlayerComponentProps {
  originalUri: string;
  started: boolean;
  loop: boolean;
  lottieInstance?: any;
}

type lottieUrl = string | null;

function LottiePlayerComponent(props: LottiePlayerComponentProps) {
  const { originalUri, started, loop } = props;

  const [lottieUrl, setLottieUrl] = useState<lottieUrl>(null);
  const lottieRef = useRef(null);

  useEffect(() => {
    if (started && originalUri && originalUri !== lottieUrl) {
      setLottieUrlForLoad(originalUri);
    }
  }, [originalUri, started]);

  async function setLottieUrlForLoad(newLottieUrl: lottieUrl) {
    try {
      if (!newLottieUrl) {
        return;
      }
      setLottieUrl(newLottieUrl);
    } catch (error) {
      // setError(error.message);
    }
  }

  if (!lottieUrl) {
    return (
      <div className="flex items-center justify-center">
        <Button onClick={() => setLottieUrlForLoad(originalUri)}>
          <div className="flex items-center justify-center gap-2 p-4">
            <FontAwesomeIcon
              icon={faPlayCircle}
              className="text-green-500 animate-pulse w-10 h-10"
            />
            <div className="text-white ">Play Animation</div>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div style={styles.animationContainer}>
      <LottieViewer
        loop={loop}
        // autoplay={false}
        ref={lottieRef}
        animationUrl={lottieUrl}
      />
    </div>
  );
}

const LottieViewer = (props: any) => {
  const {
    animationUrl,
    // width=96, height=96,
    className,
  } = props;
  const [animationData, setAnimationData] = useState<any>(null);
  const [loop, setLoop] = useState(props.loop || false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const lottieContainer = useRef<any>(null); // Reference to the container for the animation
  const lottieInstance = useRef<any>(null); // Reference to the Lottie instance
  const handlePlayFromStart = () => {
    if (lottieInstance.current) {
      lottieInstance.current.stop(); // Stop the animation
      lottieInstance.current.play(); // Restart the animation from the beginning
    }
  };
  useEffect(() => {
    const fetchAnimationData = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(animationUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        // console.error("Failed to load animation data", error);
        setError("Failed to load animation data");
      } finally {
        setLoading(false);
      }
    };

    if (animationUrl) {
      fetchAnimationData();
    } else {
      setAnimationData(null);
      setLoading(false);
      setError(null);
    }
  }, [animationUrl]);

  useEffect(() => {
    if (!animationData) {
      return;
    }
    try {
      lottieInstance.current = lottie.loadAnimation({
        container: lottieContainer.current, // The container to render the animation in
        renderer: "svg",
        loop: loop || loop, // Set to true for continuous looping
        autoplay: props.autoplay || true, // Autoplay the animation on load
        animationData: animationData, // Animation data
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      });
      return () => {
        // Cleanup Lottie instance on component unmount
        lottieInstance.current.destroy();
      };
    } catch (error) {
      setError("Failed to load animation data");
    }
    // Initialize the Lottie animation
  }, [animationData]);

  if (!animationUrl) {
    return null;
  }

  if (loading) {
    return (
      <div className="relative h-56 min-h-full items-center justify-center">
        <div
          className="animate-pulse"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#eee",
          }}
        >
          <div
            className="animate-pulse"
            style={{
              color: "rgba(0, 32, 111, 0.4)",
              fontSize: 16,
              lineHeight: 24,
            }}
          >
            Loading animation...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative h-56 min-w-40 min-h-full items-center justify-center">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 16,
              lineHeight: 24,
            }}
          >
            Error loading animation: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex justify-center items-center gap-2 flex-col">
        <div
          className="w-96 h-96"
          ref={lottieContainer} // Attach the container reference
        ></div>
        {/* if not playing currently show */}
        <div className="pb-2 gap-2 flex">
          <button className="btn btn-sm" onClick={handlePlayFromStart}>
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon
                icon={faUndo}
                className="text-black animate-pulse"
              />
              Replay
            </div>
          </button>

          {lottieInstance && (
            <button
              className={
                "btn btn-sm" +
                (lottieInstance?.current?.loop
                  ? " btn-primary"
                  : " btn-secondary")
              }
              onClick={() => {
                if (lottieInstance && !lottieInstance.current) {
                  return;
                }
                lottieInstance.current.loop = !lottieInstance?.current?.loop;
                setLoop(lottieInstance.current.loop);
                if (lottieInstance.current.loop) {
                  lottieInstance.current.play();
                }
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <FontAwesomeIcon
                  icon={faPlay}
                  className={` ${
                    lottieInstance && lottieInstance.current?.loop
                      ? "text-white"
                      : "text-black"
                  }`}
                />
                Loop
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
