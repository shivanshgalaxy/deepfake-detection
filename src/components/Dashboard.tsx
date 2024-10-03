import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DetectionResult {
    id: string;
    fileName: string;
    confidence: number;
    isManipulated: boolean;
}

const Dashboard: React.FC = () => {
    const [results, setResults] = useState<DetectionResult[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            // Simulate API call for media analysis
            setTimeout(() => {
                const newResult: DetectionResult = {
                    id: Date.now().toString(),
                    fileName: selectedFile.name,
                    confidence: Math.random() * 100,
                    isManipulated: Math.random() > 0.5,
                };
                setResults(prevResults => [...prevResults, newResult]);
                setSelectedFile(null);
            }, 1500);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">OmGuard Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Media Upload</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="mb-4"
                        />
                        <Button onClick={handleUpload} disabled={!selectedFile}>
                            <Upload className="mr-2 h-4 w-4" /> Upload and Analyze
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Analyzed</p>
                                <p className="text-2xl font-bold">{results.length}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Manipulated</p>
                                <p className="text-2xl font-bold">{results.filter(r => r.isManipulated).length}</p>
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
                        <p>No results yet. Upload media to see detection results.</p>
                    ) : (
                        <div className="space-y-4">
                            {results.map((result) => (
                                <Alert key={result.id} variant={result.isManipulated ? "destructive" : "default"}>
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>{result.fileName}</AlertTitle>
                                    <AlertDescription>
                                        Confidence: {result.confidence.toFixed(2)}%
                                        {result.isManipulated && " - Potential manipulation detected!"}
                                    </AlertDescription>
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