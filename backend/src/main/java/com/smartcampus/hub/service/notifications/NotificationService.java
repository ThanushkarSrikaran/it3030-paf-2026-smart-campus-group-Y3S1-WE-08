package com.smartcampus.hub.service.notifications;

import com.smartcampus.hub.entity.notifications.Notification;
import com.smartcampus.hub.repository.notifications.NotificationRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public NotificationService(NotificationRepository notificationRepository, SimpMessagingTemplate messagingTemplate) {
        this.notificationRepository = notificationRepository;
        this.messagingTemplate = messagingTemplate;
    }

    public Notification sendToUser(String userId, Notification notification) {
        notification.setUserId(userId);
        notification.setRead(false);
        Notification saved = notificationRepository.save(notification);
        
        // Push to user's private queue
        messagingTemplate.convertAndSendToUser(
                userId,
                "/queue/notifications",
                saved
        );
        
        return saved;
    }

    public List<Notification> getUnreadForUser(String userId) {
        return notificationRepository.findByUserIdAndReadOrderByCreatedAtDesc(userId, false);
    }

    public void markAsRead(String id) {
        notificationRepository.findById(id).ifPresent(n -> {
            n.setRead(true);
            notificationRepository.save(n);
        });
    }
}
