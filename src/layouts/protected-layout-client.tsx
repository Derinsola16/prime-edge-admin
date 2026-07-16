"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { getSessionUser } from "@/services/api/user"
import { StorageKeys } from "@/types/storage.types"
import { AppShell } from "@/components/layout/app-shell"
import PageLoading from "@/components/shared/page-loading"
import { removeCookieItem } from "@/helpers/functions/cookie"

export default function ProtectedLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const layoutReady = useRef(false)

  const {
    data: user,
    isError: userError,
    isLoading: userLoading,
  } = useQuery({
    queryFn: getSessionUser,
    queryKey: ["session-user"],
    staleTime: Infinity,
    retry: false,
  })

  useEffect(() => {
    if (user) {
      layoutReady.current = true
    }
  }, [user])

  useEffect(() => {
    const onHardExpired = () => {
      if (!layoutReady.current) {
        router.replace(
          `/login?redirect=${window.location.pathname}&token_expired=true`
        )
      }
    }

    window.addEventListener("session:hard-expired", onHardExpired)

    return () =>
      window.removeEventListener("session:hard-expired", onHardExpired)
  }, [router])

  useEffect(() => {
    if (userError) {
      queryClient.clear()
      removeCookieItem(StorageKeys.AUTHENTICATED_USER_TOKENS)
      router.replace(`/login?redirect=${window.location.pathname}`)
    }
  }, [userError, queryClient, router])

  if (userLoading || userError) {
    return <PageLoading />
  }

  return <AppShell user={user?.data}>{children}</AppShell>
}
