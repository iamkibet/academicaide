<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  $role
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!$request->user() || !in_array($request->user()->role, ['A', 'U'])) {
            abort(403, 'Invalid user role.');
        }

        if ($request->user()->role !== $role) {
            abort(403, 'Unauthorized action. Required role: ' . $role);
        }

        return $next($request);
    }
}
