"use client";
import { useNotification } from "@/hooks/notification/useNotification";
import { useNotificationSeen } from "@/hooks/notification/useNotificationSeen";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Bell, Clock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface NotificationType {
  notificationId: number;
  userId: number;
  title: string;
  message: string;
  isRead: number;
  createdAt: string;
}

export const Notification = () => {
  const { data, isLoading, isError, error } = useNotification();

  const [read, setRead] = useState(true);

  useEffect(() => {
    data?.map((val) => {
      if (val.isRead === 0) {
        setRead(false);
      }
    });
  }, [data]);

  const router = useRouter();

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const markAsRead = useNotificationSeen();

  const handleNotification = () => {
    data?.map((val) => {
      if (val.isRead === 0) {
        markAsRead.mutate(val.notificationId);
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleNotification}
        >
          <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          {read && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-semibold text-white bg-red-500 rounded-full"></span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-90 max-h-[480px] overflow-hidden p-0"
      >
        <DropdownMenuLabel className="px-4 py-3 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-850 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Notifications
            </h3>
          </div>
        </DropdownMenuLabel>

        <div className="max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading notifications...
              </p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-3">
                <Bell className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400 text-center">
                Failed to load notifications
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                {error?.message}
              </p>
            </div>
          ) : data?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                No notifications
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                You're all caught up! Check back later.
              </p>
            </div>
          ) : (
            <>
              {data?.map((val, index) => (
                <div key={val.notificationId}>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push("/order");
                    }}
                    className={`px-4 hide-scrollbar py-3 cursor-pointer transition-colors focus:bg-gray-50 dark:focus:bg-gray-800 ${
                      val.isRead === 0
                        ? "bg-blue-50/50 dark:bg-blue-950/20"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex gap-3 w-full">
                      <div
                        className={`shrink-0 w-2 h-2 rounded-full mt-2 ${
                          val.isRead === 0
                            ? "bg-blue-500"
                            : "bg-transparent border-2 border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4
                            className={`text-sm font-semibold truncate ${
                              val.isRead === 0
                                ? "text-gray-900 dark:text-white"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {val.title}
                          </h4>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                          {val.message}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(val.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  {index < (data?.length || 0) - 1 && (
                    <DropdownMenuSeparator className="my-0" />
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
