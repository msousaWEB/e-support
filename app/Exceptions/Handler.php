<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    //  PROTEGE AS ROTAS
    public function render($request, Throwable $e): \Illuminate\Http\Response|\Illuminate\Http\JsonResponse|\Symfony\Component\HttpFoundation\Response|\Illuminate\Http\RedirectResponse
    {
        if ($e instanceof \Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException) {
            if (!$request->expectsJson()) {
                return redirect()->guest(route('login'));
            }
        }

        return parent::render($request, $e);
    }

    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
