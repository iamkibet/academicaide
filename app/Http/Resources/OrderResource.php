<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
            'payment_status' => $this->payment_status,
            'assignment_type' => $this->assignment_type,
            'service_type' => $this->service_type,
            'academic_level' => $this->academic_level,
            'subject' => $this->subject,
            'language' => $this->language,
            'pages' => $this->pages,
            'words' => $this->words,
            'size_unit' => $this->size_unit,
            'line_spacing' => $this->line_spacing,
            'citation_style' => $this->citation_style,
            'source_count' => $this->source_count,
            'price_per_page' => (float) $this->price_per_page,
            'total_price' => (float) $this->total_price,
            'is_urgent' => (bool) $this->is_urgent,
            'deadline' => $this->deadline,
            'instructions' => $this->instructions,
            'client_notes' => $this->client_notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Relationships
            'client' => $this->when($this->client, fn() => [
                'id' => $this->client->id,
                'name' => $this->client->name,
                'email' => $this->client->email,
            ]),

            'files' => $this->when($this->files, fn() => $this->files->map(fn($file) => [
                'id' => $file->id,
                'path' => $file->path,
                'original_name' => $file->original_name,
                'mime_type' => $file->mime_type,
                'size' => $file->size,
                'created_at' => $file->created_at,
            ])),

            'messages' => $this->when($this->messages, fn() => $this->messages->map(fn($message) => [
                'id' => $message->id,
                'content' => $message->content,
                'sender' => [
                    'id' => $message->sender->id,
                    'name' => $message->sender->name,
                    'role' => $message->sender->role,
                ],
                'receiver' => [
                    'id' => $message->receiver->id,
                    'name' => $message->receiver->name,
                    'role' => $message->receiver->role,
                ],
                'created_at' => $message->created_at,
            ])),

            // Computed properties
            'can_be_edited' => $this->when(method_exists($this, 'canBeEdited'), fn() => $this->canBeEdited()),
            'is_overdue' => $this->when(method_exists($this, 'isOverdue'), fn() => $this->isOverdue()),
            'needs_attention' => $this->when(method_exists($this, 'needsAttention'), fn() => $this->needsAttention()),
            'academicLevel' => $this->whenLoaded('academicLevel', function () {
                return [
                    'name' => optional($this->academicLevel)->name,
                ];
            }),
            'subjectCategory' => $this->whenLoaded('subjectCategory', function () {
                return [
                    'name' => optional($this->subjectCategory)->name,
                ];
            }),
        ];
    }
}
