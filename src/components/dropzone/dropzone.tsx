/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

// import './dropzone.css'

import { observer } from 'mobx-react'
import ComponentStore from '../../store/componentStore'
import useEventListener from '../../ts/utils/useEventListener'
import {
  ElectronFile,
  FileTransformType,
  FileWithMetadata
} from '../../types/fileTypes'
import DraggableWrapper from './draggable'

const { FileStore } = ComponentStore

const { updateFiles, setDropzoneRef } = FileStore

const createVideoThumbnail = (videoFile: File) => {
  const thumbnail = new Promise<{
    preview: string
    videoMetadata?: {
      height: number
      width: number
      duration: number
      otherMetadata: any
    }
  }>((resolve, reject) => {
    try {
      const videoElement = document.createElement('video')
      const canPlay = videoElement.canPlayType(videoFile.type)
      if (!canPlay) {
        reject(new Error('Does not support video type'))
      }
      const snapImage = () => {
        const videoCanvas = document.createElement('canvas')
        videoCanvas.width = videoElement.videoWidth
        videoCanvas.height = videoElement.videoHeight

        // @ts-ignore
        videoCanvas
          .getContext('2d')
          .drawImage(videoElement, 0, 0, videoCanvas.width, videoCanvas.height)

        const img = videoCanvas.toDataURL()
        const success = img.length > 100000
        if (success) {
          resolve({
            preview: img,
            videoMetadata: {
              height: videoElement.videoHeight,
              width: videoElement.videoWidth,
              duration: videoElement.duration,
              otherMetadata: videoElement
            }
          })
        }
        return success
      }
      const timeUpdate = () => {
        // console.info('Playing time update');
        if (snapImage()) {
          videoElement.removeEventListener('timeupdate', timeUpdate)
          videoElement.pause()
        }
      }
      videoElement.addEventListener('loadeddata', () => {
        console.info('Loaded MetaData')
        if (snapImage()) {
          videoElement.removeEventListener('timeupdate', timeUpdate)
          videoElement.pause()
        }
      })

      const videoUrl = URL.createObjectURL(
        new Blob([videoFile], { type: videoFile.type })
      )
      videoElement.addEventListener('timeupdate', timeUpdate)
      videoElement.preload = 'metadata'
      videoElement.src = videoUrl
      videoElement.muted = true
      // @ts-ignore playsInline is supported by video elements
      videoElement.playsInline = true
      videoElement.play()
    } catch (err) {
      console.error(err)
      reject(new Error(err.message))
    }
  })
  return thumbnail
}

const Dropzone = () => {
  const [files, setFiles] = useState<Array<FileWithMetadata>>([])

  const [scroll, setScroll] = useState(0)

  const dropzoneRef = React.useRef<HTMLDivElement | null>(null)

  const thumbnailRef = React.useRef<HTMLDivElement | null>(null)

  const { globalReset } = ComponentStore

  useEffect(() => {
    if (globalReset) {
      setFiles([])
    }
  }, [globalReset])

  useEffect(() => {
    setDropzoneRef(dropzoneRef)
    return () => {
      delete FileStore.dropzoneRef
    }
  }, [])

  const translateScroll = (e: WheelEvent) => {
    const maxScroll = thumbnailRef?.current?.scrollHeight || 500
    if (e.deltaY < 0 && scroll > 0) {
      setScroll(s => s - 10)
    } else if (e.deltaY > 0 && scroll < maxScroll) {
      setScroll(s => s + 10)
    }
    if (thumbnailRef && thumbnailRef.current) {
      thumbnailRef.current.scrollTo({ top: scroll, behavior: 'smooth' })
    }
  }

  useEventListener(dropzoneRef, 'wheel', translateScroll)

  const onDrop = useCallback(async acceptedFiles => {
    // Do something with the files

    const newFiles: Array<FileWithMetadata> = await Promise.all(
      acceptedFiles.map(async (file: ElectronFile) => {
        // TODO (rahul) Fix Promise waiting
        if (file.type.match('image')) {
          return {
            file,
            preview: URL.createObjectURL(file),
            path: file.path || '',
            customType: 'image'
          }
        }
        if (file.type.match('video')) {
          // Generate preview for Video
          try {
            const videoData = await createVideoThumbnail(file)
            return {
              file,
              preview: videoData.preview,
              path: file.path || '',
              customType: 'video',
              videoMetadata: videoData.videoMetadata
            }
          } catch (err) {
            return {
              file,
              preview: '',
              path: file.path || '',
              customType: 'video'
            }
          }
        }
        if (file.type.match('audio')) {
          return {
            file,
            preview: '', // TODO (rahul) Add audio icon
            customType: 'audio',
            path: file.path || ''
          }
        }

        return { file, preview: '', customType: 'other', path: file.path || '' }
      })
    )
    const transforms: FileTransformType[] = []
    for (const newFile of newFiles) {
      const newTransform: FileTransformType = {
        type: newFile.customType,
        fileObj: newFile,
        state: 'Insert'
      }
      transforms.push(newTransform)
    }
    updateFiles(transforms)

    setFiles(f => f.concat(newFiles))
  }, [])

  useEffect(() => {
    files.forEach(file => {
      if (file.preview) URL.revokeObjectURL(file.preview)
    })
  }, [files])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ['video/*', 'image/*', 'audio/*']
  })

  return (
    <div className="preview-wrapper">
      <div className="dropzone outline-none" id="dropzone" {...getRootProps()}>
        <div className="scrollable-wrapper outline-none" ref={dropzoneRef}>
          <input {...getInputProps()} />

          {files.length > 0 ? null : (
            <>
              <div className="w-1/3 px-2">
                <img alt="Video file svg" src="images/upload.svg" />
              </div>
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>
                  <u>Click</u> or Drag to add files.{' '}
                </p>
              )}
            </>
          )}
        </div>
        {/* @ts-ignore Styled JSX */}
        <style jsx>
          {`
            .dropzone {
              width: ${files.length > 0 ? '90%' : '100%'};
            }
          `}
        </style>
      </div>
      <aside ref={thumbnailRef} className="thumbs-container">
        <DraggableWrapper files={files} />
      </aside>
    </div>
  )
}
export default observer(Dropzone)
