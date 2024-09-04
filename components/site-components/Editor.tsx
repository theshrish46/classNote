'use client'

import { useEffect, useState, useRef } from "react"

import EditorJS from "@editorjs/editorjs"
import { Button } from "@react-email/components"


export default function Editor() {
  const [isMounted, setIsMounted] = useState(false)
  const ref = useRef<EditorJS>()

  const initializeEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const List = (await import("@editorjs/list")).default
    const LinkTool = (await import("@editorjs/link")).default
    const Qoute = (await import("@editorjs/quote")).default
    const CheckList = (await import("@editorjs/checklist")).default
    const Embed = (await import("@editorjs/embed")).default
    const Image = (await import("@editorjs/image")).default
    const SimpleImage = (await import("@editorjs/simple-image")).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editorjs',
        tools: {

          header: Header,
          list: {
            class: List,
            inlineToolbar: ['link'],
          },
          link: {
            class: LinkTool,
            inlineToolbar: true
          },
          qoute: {
            class: Qoute,
            inlineToolbar: true,
            config: {
              qoutePlaceholder: "Enter a qoute",
              captionPlaceholder: "Qoute\'s Author"
            }
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true,
                facebook: true,
                instagram: true,
                twitter: true,
                github: true,
              }
            }
          }
        },
      })
      ref.current = editor
    }
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await initializeEditor()
    }

    if (isMounted) {
      init()

      return () => {
        if (ref.current) {
          ref.current.destroy()
        }
      }
    }
  }, [isMounted])

  const save = async () => {
    if (ref.current) {
      ref.current.save().then((outputdata) => {
        console.log("Article Data", outputdata.blocks[0].data.text);
        // const response = await clear
      })
    }
  }
  return (
    <>
      <div id={'editorjs'} />
      <Button onClick={save}>Save</Button>
    </>
  )
}
