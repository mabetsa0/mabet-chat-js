import { Eye } from 'lucide-react'
import React, { useRef } from 'react'

type Props = {
  unit: {
    name: string
    id: string
    // code: string
    // address: string
    image: string
  }
}

const UnitCard = ({ unit: { name, image, id } }: Props) => {
  const ref = useRef<React.ComponentRef<'div'>>(null)

  return (
    <>
      <div dir="rtl" className="mx-auto my-4 max-w-md px-4" ref={ref}>
        <div className="overflow-hidden rounded-lg border">
          <p className="border-b bg-[#F2F2F2] px-[6px] py-2 text-sm font-bold">
            استفسار عن حجز {name}
          </p>
          <div className="flex">
            <div className="h-[95px] w-[95px]">
              <img
                className="h-full w-full object-cover"
                src={image}
                alt={name}
              />
            </div>
            <div className="space-y-2 p-2">
              <p className="text-sm font-bold">{name}</p>
              {/* <div className="flex items-center gap-[2px]">
                <QrCode className="h-[13px] w-[13px]" />
                <span className="text-[8px] text-[#878787]">
                  كود الوحدة {code}
                </span>
              </div> */}
              {/* <div className="flex items-center gap-[2px]">
                <MapPin className="h-[13px] w-[13px]" />
                <span className="text-[8px] text-[#878787]"> {address}</span>
              </div> */}
              <a
                href={`https://mabet.com.sa/ar/units/${id}`}
                target="_blank"
                className="flex items-center gap-1"
              >
                <Eye className="size-4" />
                <span className="text-muted-foreground text-xs font-medium">
                  عرض الوحدة
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' })
          }
        }}
        className="sticky top-10 z-10 mb-2 flex cursor-pointer justify-center"
      >
        <div className="text-foreground/80 w-fit rounded-3xl border border-[#EEEEEE] bg-white px-4 py-1 text-center text-sm font-semibold">
          استفسار عن حجز {name}
        </div>
      </div>
    </>
  )
}

export default UnitCard
