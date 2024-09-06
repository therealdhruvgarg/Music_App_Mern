"use client"
import { useState, useEffect } from 'react'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { ThumbsUp, ThumbsDown, Play, Share2 } from "lucide-react"
import Image from "next/image"
import { toast } from "@/app/components/ui/use-toast"
import axios from 'axios'

interface Song {
  id: string;
  title: string;
  votes: number;
  url: string;
  thumbnail: string;
}

const REFRESH_INTERVAL_MS = 10 * 1000;

const fetchVideoDetails = async (url: string): Promise<{ title: string, thumbnail: string }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    title: `Video Title for ${url.split('v=')[1]}`,
    thumbnail: `/placeholder.svg?height=90&width=120`,
  };
}

export default function Component() {
  const [inputUrl, setInputUrl] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [queue, setQueue] = useState<Song[]>([
    { id: '1', title: 'Never Gonna Give You Up', votes: 5, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/placeholder.svg?height=90&width=120' },
    { id: '2', title: 'Gangnam Style', votes: 3, url: 'https://www.youtube.com/embed/9bZkp7q19f0', thumbnail: '/placeholder.svg?height=90&width=120' },
    { id: '3', title: 'Despacito', votes: 1, url: 'https://www.youtube.com/embed/kJQP7kiw5Fk', thumbnail: '/placeholder.svg?height=90&width=120' },
  ])
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    setCanShare(!!navigator.share)
  }, [])

  async function refreshStreams(){
    const res = await fetch("/api/streams/my",{
        credentials : "include"
       }
       )
    console.log(res);
   
  }

  useEffect(() => {
    refreshStreams();
    const interval = setInterval(() => {},REFRESH_INTERVAL_MS);
  }, [queue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value)
    setPreviewUrl(e.target.value.replace('watch?v=', 'embed/'))
  }

  const handleSubmit = async () => {
    if (inputUrl) {
      try {
        const { title, thumbnail } = await fetchVideoDetails(inputUrl);
        const newSong: Song = {
          id: Date.now().toString(),
          title,
          thumbnail,
          votes: 0,
          url: inputUrl.replace('watch?v=', 'embed/'),
        }
        setQueue([...queue, newSong])
        setInputUrl('')
        setPreviewUrl('')
      } catch (error) {
        console.error('Error fetching video details:', error)
      }
    }
  }

  const handleVote = (id: string, increment: number) => {
    setQueue(queue.map(song => 
      song.id === id ? { ...song, votes: song.votes + increment } : song
    ).sort((a, b) => b.votes - a.votes))
  }

  const playNext = () => {
    if (queue.length > 0) {
      setCurrentSong(queue[0])
      setQueue(queue.slice(1))
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: 'Song Voting Queue',
      text: 'Join our music session and vote for your favorite songs!',
      url: window.location.href
    }

    if (canShare) {
      try {
        await navigator.share(shareData)
        toast({
          title: "Shared successfully!",
          description: "The page has been shared.",
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link copied!",
          description: "The page URL has been copied to your clipboard.",
        })
      }, (err) => {
        console.error('Could not copy text: ', err)
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-4 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-100">Song Voting Queue</h1>
          <Button onClick={handleShare} className="bg-purple-600 hover:bg-purple-700 text-white">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
        
        {/* Now Playing Section */}
        <div className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-200">Now Playing</h2>
          {currentSong ? (
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="aspect-video">
                <iframe 
                  src={currentSong.url} 
                  className="w-full h-full rounded-lg"
                  title={currentSong.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-gray-200">{currentSong.title}</h3>
                <p className="text-gray-400">Enjoy the music!</p>
              </div>
            </div>
          ) : (
            <p className="text-lg text-gray-300">No song is currently playing. Start the queue to begin!</p>
          )}
        </div>

        {/* Song submission */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-2">Add a Song</h2>
          <div className="flex gap-2">
            <Input 
              type="text" 
              placeholder="Enter YouTube URL" 
              value={inputUrl}
              onChange={handleInputChange}
              className="flex-grow bg-gray-800 text-gray-100 border-gray-700 focus:border-gray-600"
            />
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">
              Add to Queue
            </Button>
          </div>
        </div>

        {/* Preview */}
        {previewUrl && (
          <div className="aspect-video mb-6">
            <iframe 
              src={previewUrl} 
              className="w-full h-full rounded-lg"
              title="Video Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Queue */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">Upcoming Songs</h2>
          {queue.length > 0 ? (
            <div className="space-y-4">
              {queue.map((song) => (
                <div key={song.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md">
                  <div className="flex items-center gap-4">
                    <Image 
                      src={song.thumbnail} 
                      alt={song.title} 
                      width={120} 
                      height={90} 
                      className="rounded"
                    />
                    <span className="font-medium text-gray-200">{song.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-gray-200">{song.votes}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleVote(song.id, 1)} 
                      className="bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 transition-colors"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span className="sr-only">Upvote</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleVote(song.id, -1)} 
                      className="bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 transition-colors"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span className="sr-only">Downvote</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">The queue is empty. Add some songs!</p>
          )}
        </div>

        {/* Play next button */}
        <Button onClick={playNext} disabled={queue.length === 0} size="lg" className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white">
          <Play className="mr-2 h-5 w-5" /> Play Next
        </Button>
      </div>
    </div>
  )
}