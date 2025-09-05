import React, { useRef } from "react"
import { MapPin, QrCode } from "lucide-react"
import useClickOutside from "@/hooks/use-click-outside"

type Props = {
  unit: {
    name: string
    code: string
    address: string
    image: string
    link: string
  }
}

const UnitCard = ({ unit: { name, code, address, image, link } }: Props) => {
  const ref = useRef<React.ComponentRef<"div">>(null)

  return (
    <>
      <div dir="rtl" className="mx-auto my-4  max-w-md px-4" ref={ref}>
        <div className="overflow-hidden rounded-lg border">
          <p className="border-b bg-[#F2F2F2] px-[6px] py-2 text-sm font-bold text-secondaryColor">
            استفسار عن حجز {name}
          </p>
          <div className="flex items-center ">
            <div className="h-[95px] w-[95px]">
              <img
                className="h-full w-full object-cover"
                src={image}
                alt={`${code}-pic`}
              />
            </div>
            <div className="space-y-2 p-2 text-xs ">
              <p className=" font-bold">{name}</p>
              <div className="flex items-center gap-[2px]">
                <QrCode className="h-[13px] w-[13px]" />
                <span className="text-[8px] text-[#878787]">
                  كود الوحدة {code}
                </span>
              </div>
              <div className="flex items-center gap-[2px]">
                <MapPin className="h-[13px] w-[13px]" />
                <span className="text-[8px] text-[#878787]"> {address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" })
          }
        }}
        className="sticky cursor-pointer top-10 z-10 mb-2 flex justify-center "
      >
        <div className=" text-sm w-fit rounded-3xl border border-[#EEEEEE] bg-white px-4 py-1 text-center font-semibold text-foreground/80 ">
          استفسار عن حجز {name}
        </div>
      </div>
    </>
  )
}

export default UnitCard
