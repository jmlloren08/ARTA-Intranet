<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class SystemNotification extends Notification
{
    use Queueable;

    private $activity;
    private $type;

    /**
     * Create a new notification instance.
     */
    public function __construct($activity, $type = 'new')
    {
        $this->activity = $activity;
        $this->type = $type;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'message' => $this->type === 'new' ? "A new activity '{$this->activity->work_item}' has been assigned to you." : "The activity '{$this->activity->work_item}' was updated.",
            'activity_id' => $this->activity->id,
            'work_id' => $this->activity->work_id,
            'type' => $this->type,
            'created_by' => $this->activity->created_by
        ];
    }
}
