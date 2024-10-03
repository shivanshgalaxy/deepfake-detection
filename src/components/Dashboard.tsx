import React, { useState, useCallback } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface DetectionResult {
    id: string;
    fileName: string;
    message: string;
    isReal: boolean;
}

const Dashboard: React.FC = () => {
    const [results, setResults] = useState<DetectionResult[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            if (file.name.split('.').pop()?.toLowerCase() !== 'mp4') {
                setError("File format not supported. Please upload an MP4 file.");
                event.target.value = '';
            } else {
                setSelectedFile(file);
                setError(null);
            }
        }
    };

    const getCsrfToken = (): string => {
        const name = 'csrftoken';
        let cookieValue = '';
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    const uploadFile = useCallback(async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setError(null);
        setMessage(null);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('uploaded_file', selectedFile);

        try {
            const response = await fetch('http://localhost:8000/upload_video/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': getCsrfToken(),
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.status === 'success') {
                await processVideo(data.file_path);
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while uploading the video. Please try again.');
        } finally {
            setIsUploading(false);
            setSelectedFile(null);
            setUploadProgress(0);
        }
    }, [selectedFile]);

    const processVideo = async (filePath: string) => {
        setIsProcessing(true);
        setMessage('Processing...');

        try {
            const response = await fetch('http://localhost:8000/process_video/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken(),
                },
                body: JSON.stringify({ file_path: filePath }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.status === 'success') {
                const newResult: DetectionResult = {
                    id: Date.now().toString(),
                    fileName: selectedFile!.name,
                    message: data.message,
                    isReal: data.message.includes('REAL'),
                };
                setResults(prevResults => [...prevResults, newResult]);
                setMessage(data.message);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while processing the video. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">OmGuard Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Video Upload</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="mb-4"
                            accept=".mp4"
                        />
                        <Button
                            onClick={uploadFile}
                            disabled={!selectedFile || isUploading || isProcessing}
                            className="btn btn-primary w-full"
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            {isUploading ? 'Uploading...' : isProcessing ? 'Processing...' : 'Upload and Analyze'}
                        </Button>
                        {(isUploading || isProcessing) && (
                            <div className="mt-4">
                                <Progress value={uploadProgress} className="w-full" />
                                <p className="text-sm text-muted-foreground mt-2">
                                    {isUploading ? `Uploading: ${uploadProgress}%` : 'Processing...'}
                                </p>
                            </div>
                        )}
                        {(message || error) && (
                            <Alert variant={error ? "destructive" : "default"} className="mt-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>{error ? 'Error' : 'Result'}</AlertTitle>
                                <AlertDescription>{error || message}</AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Processing Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Processed</p>
                                <p className="text-2xl font-bold">{results.length}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Real Videos</p>
                                <p className="text-2xl font-bold">{results.filter(r => r.isReal).length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Detection Results</CardTitle>
                </CardHeader>
                <CardContent>
                    {results.length === 0 ? (
                        <p>No results yet. Upload a video to see detection results.</p>
                    ) : (
                        <div className="space-y-4">
                            {results.map((result) => (
                                <Alert key={result.id} variant={result.isReal ? "default" : "destructive"}>
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>{result.fileName}</AlertTitle>
                                    <AlertDescription>{result.message}</AlertDescription>
                                </Alert>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;