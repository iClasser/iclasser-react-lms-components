"use client";
import DEVELOPMENT_CONFIG from "@/package/development.config";
import { useCallback, useEffect, useState } from "react";
import {Button} from "@/components";

interface FileUploaderProps {
  className?: string;
  onComplete: any;
  onCompleteCloseModal?: any;
}

export default function FileUploader(props: FileUploaderProps) {
  const [file, setFile] = useState("");
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = useCallback(async (file: string) => {
    if (!file) return;
    setFile(file);
    props.onComplete({
      url: file,
    });
    if (props.onCompleteCloseModal) {
      props.onCompleteCloseModal();
    }
    setComplete(true);
  }, [props]);

  return (
    <div
      className={
        props.className
          ? props.className
          : "flex flex-col items-center justify-center space-y-4 bg-gray-50 p-3 border border-gray-200"
      }
    >
      {complete && (
        <div className="flex flex-col space-y-4">
          <div className="text-green-500 text-center">Upload complete</div>
        </div>
      )}
      {file && (
        <div className="flex flex-col space-y-4">
          <div className="text-center">File: {file}</div>
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
      {!complete && (
        <Button
          onClick={() => uploadFile(DEVELOPMENT_CONFIG.UPLOAD_URL1)}
          disabled={complete}
        >
          <div className="flex gap-2">Upload sample</div>
        </Button>
      )}
      {complete && (
        <Button
          onClick={() => props.onCompleteCloseModal()}
          disabled={!complete}
        >
          <div className="flex gap-2">Close</div>
        </Button>
      )}
    </div>
  );
}
