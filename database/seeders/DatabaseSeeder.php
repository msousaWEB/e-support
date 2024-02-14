<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
//         \App\Models\User::factory(10)->create();

        // Criação de usuários para cada role
//        User::query()->create([
//            'name' => 'Admin User',
//            'email' => 'admin@example.com',
//            'password' => Hash::make('123'),
//            'role_id' => 1,
//        ]);
//
//        User::query()->create([
//            'name' => 'Suporte User',
//            'email' => 'suporte@example.com',
//            'password' => Hash::make('123'),
//            'role_id' => 2,
//        ]);
//
//        User::query()->create([
//            'name' => 'Atendimento User',
//            'email' => 'atendimento@example.com',
//            'password' => Hash::make('123'),
//            'role_id' => 3,
//        ]);

//        Role::query()->create([
//            'name' => 'Administrador',
//            'permissions' => 7,
//        ]);
//
//        Role::query()->create([
//            'name' => 'Suporte',
//            'permissions' => 5,
//        ]);
//
//        Role::query()->create([
//            'name' => 'Atendimento',
//            'permissions' => 3,
//        ]);
    }

    // \App\Models\User::factory()->create([
    //     'name' => 'Test User',
    //     'email' => 'test@example.com',
    // ]);
}
