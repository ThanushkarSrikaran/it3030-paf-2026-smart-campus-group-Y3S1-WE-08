package com.smartcampus.hub.controller.ticketing;

import com.smartcampus.hub.entity.ticketing.Comment;
import com.smartcampus.hub.entity.ticketing.Ticket;
import com.smartcampus.hub.enums.ticketing.TicketStatus;
import com.smartcampus.hub.security.PrincipalUser;
import com.smartcampus.hub.service.ticketing.TicketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<?> createTicket(
            @RequestBody Ticket ticket,
            @AuthenticationPrincipal PrincipalUser principalUser
    ) {
        try {
            ticket.setReporterEmail(principalUser.getUsername());
            return ResponseEntity.ok(ticketService.createTicket(ticket));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<List<Ticket>> getAllTickets(@AuthenticationPrincipal PrincipalUser principalUser) {
        return ResponseEntity.ok(ticketService.getAllTickets(principalUser.getUsername()));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Ticket>> getMyTickets(@AuthenticationPrincipal PrincipalUser principalUser) {
        return ResponseEntity.ok(ticketService.getMyTickets(principalUser.getUsername()));
    }

    @GetMapping("/assigned")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'TECHNICIAN')")
    public ResponseEntity<List<Ticket>> getAssignedTickets(@AuthenticationPrincipal PrincipalUser principalUser) {
        return ResponseEntity.ok(ticketService.getAssignedTickets(principalUser.getUsername()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(
            @PathVariable String id,
            @AuthenticationPrincipal PrincipalUser principalUser
    ) {
        return ResponseEntity.ok(ticketService.getTicketById(id, principalUser.getUsername()));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Ticket> updateTicketStatus(
            @PathVariable String id,
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestParam TicketStatus status
    ) {
        return ResponseEntity.ok(ticketService.updateTicketStatus(id, status, principalUser.getUsername()));
    }

    @PatchMapping("/{id}/assign")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Ticket> assignTicket(
            @PathVariable String id,
            @RequestParam String technicianEmail
    ) {
        return ResponseEntity.ok(ticketService.assignTicket(id, technicianEmail));
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<Ticket> addComment(
            @PathVariable String id,
            @RequestBody Comment comment,
            @AuthenticationPrincipal PrincipalUser principalUser
    ) {
        comment.setUserEmail(principalUser.getUsername());
        comment.setUserName(principalUser.getUser().getName());
        return ResponseEntity.ok(ticketService.addComment(id, comment, principalUser.getUsername()));
    }
}
