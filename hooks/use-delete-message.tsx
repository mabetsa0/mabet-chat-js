import { deleteMessage } from '@/services/delete-message'
import { useSessionStore } from '@/stores/session-store-provider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

export const useDeleteMessage = () => {
  const token = useSessionStore((s) => s.accessToken)
  const queryClient = useQueryClient()
  const { uuid } = useParams()
  const mutation = useMutation({
    mutationFn: ({ id }: { id: string | number }) => {
      return deleteMessage({ messageId: id, token })
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['chat-messages', uuid],
      })
      toast.success('تم حذف الرسالة ')
    },
    onError() {
      toast.success('لم يتم حذف الرسالة')
    },
  })

  return mutation
}
