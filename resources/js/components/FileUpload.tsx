import axios from 'axios';
import React, { useRef, useState } from 'react';

interface FileUploadProps {
    orderId: string;
    files: Array<any>;
    onFilesUploaded: (files: any[]) => void;
    onRemove: (fileId: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ orderId, files, onFilesUploaded, onRemove }) => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const MAX_FILE_SIZE = 150 * 1024 * 1024; // 150MB

    const handleFiles = async (fileList: FileList | null) => {
        if (!fileList || !orderId) return;
        setUploading(true);
        setError(null);
        // Check file sizes
        for (const file of Array.from(fileList)) {
            if (file.size > MAX_FILE_SIZE) {
                setError(`File "${file.name}" exceeds 150MB limit.`);
                setUploading(false);
                return;
            }
        }
        const formData = new FormData();
        Array.from(fileList).forEach((file) => formData.append('files[]', file));
        try {
            const res = await axios.post(`/client/orders/${orderId}/files`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (e) => {
                    if (e.total) setProgress(Math.round((e.loaded * 100) / e.total));
                },
            });
            onFilesUploaded(res.data.files);
        } catch (e: any) {
            setError('Upload failed.');
        } finally {
            setUploading(false);
            setProgress(0);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
    };

    return (
        <div
            className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-colors hover:bg-gray-100"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleFileChange} disabled={uploading} accept="*" />
            <div className="mb-2 text-gray-600">
                Browse or drag and drop multiple files here
                <br />
                <span className="text-xs text-gray-500">Max file size is 150 MB per file.</span>
            </div>
            {uploading && <div className="mt-2 text-sm text-blue-700">Uploading... {progress}%</div>}
            {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
            {files.length > 0 && (
                <ul className="mt-4 space-y-2 text-left">
                    {files.map((file) => (
                        <li key={file.id} className="flex items-center justify-between rounded bg-white px-3 py-2 shadow-sm">
                            <span className="max-w-xs truncate">{file.original_filename || file.original_name}</span>
                            <span className="ml-2 text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
                            <button
                                className="ml-4 text-xs text-red-500 hover:text-red-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove(file.id);
                                }}
                                disabled={uploading}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FileUpload;
