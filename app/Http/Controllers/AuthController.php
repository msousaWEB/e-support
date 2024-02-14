<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credenciais = $request->all(['email', 'password']);
        $token = auth('api')->attempt($credenciais);

        if ($token) {
            return response()->json(['token' => $token]);
        } else {
            return response()->json(['error' => 'Login ou senha incorretos!'], 403);
        }
    }

    public function user(): JsonResponse
    {
        $user = auth()->user();
        $user->load('role');

        return response()->json($user);
    }


    public function logout(): JsonResponse
    {
        auth('api')->logout();
        return response()->json(['msg' => 'Logout realizado com sucesso!']);
    }

    public function refresh(): JsonResponse
    {
        $token = auth('api')->refresh();
        return response()->json(['token' => $token]);
    }
}
