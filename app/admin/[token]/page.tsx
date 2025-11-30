import { MessageSquare } from 'lucide-react'

export default async function User() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <div className="relative">
          <div className="bg-primary/20 absolute inset-0 animate-pulse rounded-full blur-2xl" />
          <MessageSquare className="text-muted-foreground relative size-20" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">اختر محادثة لعرضها</h2>
          <p className="text-muted-foreground max-w-md text-sm">
            اختر محادثة من القائمة الجانبية لبدء المحادثة أو عرض الرسائل السابقة
          </p>
        </div>
      </div>
    </div>
  )
}
