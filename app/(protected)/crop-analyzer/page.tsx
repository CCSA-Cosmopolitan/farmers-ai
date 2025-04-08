"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { UploadIcon as FileUpload, Loader2, Upload } from "lucide-react"
import Image from "next/image"
import { generateCropAnalysis } from "@/actions/ai"

export default function CropAnalyzerPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image of your crop or plant",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setAnalysis(null)

    try {
      // In a real implementation, we would upload the image to AWS S3
      // For this demo, we'll use a description of the image
      const imageDescription =
        "A healthy green crop plant with broad leaves, possibly cassava or yam, growing in rich soil under good sunlight conditions in Nigeria."

      const result = await generateCropAnalysis(imageDescription)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      setAnalysis(result.text || null)

      toast({
        title: "Analysis Complete",
        description: "Your crop analysis has been generated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate crop analysis. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Crop Analyzer</h1>
        <p className="text-muted-foreground">
          Upload images of crops or plants to get detailed analysis and information.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Crop Image</CardTitle>
            <CardDescription>Upload a clear image of your crop or plant for analysis.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="crop-image">Crop Image</Label>
                <div className="flex items-center gap-4">
                  <div className="grid h-32 w-full place-items-center rounded-lg border border-dashed">
                    {previewUrl ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={previewUrl || "/placeholder.svg"}
                          alt="Crop preview"
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-center">
                        <FileUpload className="h-8 w-8 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Drag & drop or click to upload</p>
                      </div>
                    )}
                    <Input
                      id="crop-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("crop-image")?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Select Image
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, WEBP. Max file size: 5MB.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading || !selectedImage}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Crop"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {analysis && (
          <Card>
            <CardHeader>
              <CardTitle>Crop Analysis Results</CardTitle>
              <CardDescription>Based on the image provided, here's our analysis of your crop.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap">{analysis}</div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

