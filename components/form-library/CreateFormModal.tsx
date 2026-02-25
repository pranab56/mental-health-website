"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Link, List, MoreHorizontal, Palette, Type, Underline } from "lucide-react"

interface CreateFormModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

export default function CreateFormModal({ isOpen, onClose, title }: CreateFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white rounded-2xl overflow-hidden p-0">
        <DialogHeader className="pt-6 px-6">
          <DialogTitle className="text-2xl font-semibold text-center text-[#222222]">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-4">
          <div className="bg-[#6BB7B2]/20 rounded-t-lg border-b border-[#E2E8F0] p-2 flex items-center gap-2 flex-wrap min-h-[40px]">
            <div className="flex items-center gap-1 bg-white rounded-md px-2 py-1 text-sm text-[#6BB7B2] border border-[#6BB7B2]/30">
              <span>14</span>
              <MoreHorizontal className="w-3 h-3" />
            </div>

            <div className="h-4 w-[1px] bg-[#E2E8F0] mx-1" />

            <button className="p-1 hover:bg-[#6BB7B2]/10 rounded text-[#6BB7B2]"><Type className="w-4 h-4" /></button>
            <button className="p-1 hover:bg-[#6BB7B2]/10 rounded text-[#6BB7B2]"><Palette className="w-4 h-4" /></button>

            <div className="h-4 w-[1px] bg-[#E2E8F0] mx-1" />

            <button className="p-1 hover:bg-[#6BB7B2]/10 rounded text-[#6BB7B2] font-bold"><Bold className="w-4 h-4" /></button>
            <button className="p-1 hover:bg-[#6BB7B2]/10 rounded text-[#6BB7B2] italic"><Italic className="w-4 h-4" /></button>
            <button className="p-1 hover:bg-[#6BB7B2]/10 rounded text-[#6BB7B2] underline"><Underline className="w-4 h-4" /></button>
            <button className="p-1 hover:bg-[#6BB7B2]/10 rounded text-white bg-[#6BB7B2] rounded-sm"><Link className="w-4 h-4" /></button>

            <div className="h-4 w-[1px] bg-[#E2E8F0] mx-1" />

            <button className="p-1 hover:bg-[#6BB7B2]/10 rounded text-[#6BB7B2]"><AlignLeft className="w-4 h-4" /></button>
            <button className="p-1 hover:bg-[#6BB7B2]/10 rounded text-[#6BB7B2]"><AlignCenter className="w-4 h-4" /></button>
            <button className="p-1 hover:bg-[#6BB7B2]/10 rounded text-[#6BB7B2]"><AlignRight className="w-4 h-4" /></button>

            <div className="h-4 w-[1px] bg-[#E2E8F0] mx-1" />

            <button className="p-1 hover:bg-[#6BB7B2]/10 rounded text-[#6BB7B2]"><Link className="w-4 h-4" /></button>
            <button className="p-1 hover:bg-[#6BB7B2]/10 rounded text-[#6BB7B2]"><List className="w-4 h-4" /></button>
            <button className="p-1 hover:bg-[#6BB7B2]/10 rounded text-[#6BB7B2]"><Palette className="w-4 h-4" /></button>
            <button className="p-1 hover:bg-[#6BB7B2]/10 rounded text-[#6BB7B2]"><Link className="w-4 h-4" /></button>
          </div>

          <div className="bg-white border-x border-b border-[#E2E8F0] rounded-b-lg p-4 min-h-[300px] text-sm text-[#444444] leading-relaxed max-h-[400px] overflow-y-auto custom-scrollbar">
            <p className="mb-4">Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus.</p>
            <p>Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus.</p>
          </div>
        </div>

        <div className="flex justify-end gap-4 px-6 pb-6 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-8 border-[#D1D5DB] text-[#444444] hover:bg-gray-50 h-11 min-w-[120px]"
          >
            Cancel
          </Button>
          <Button
            className="bg-[#9B8AC7] hover:bg-[#8A79B6] text-white px-10 h-11 min-w-[120px]"
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
