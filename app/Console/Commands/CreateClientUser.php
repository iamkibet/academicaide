<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CreateClientUser extends Command
{
    protected $signature = 'client:create';
    protected $description = 'Create a new client user';

    public function handle()
    {
        $name = $this->ask('What is the client\'s name?');
        $email = $this->ask('What is the client\'s email?');
        $password = $this->secret('What is the client\'s password?');
        $passwordConfirmation = $this->secret('Please confirm the password');

        $validator = Validator::make([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $passwordConfirmation,
        ], [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }
            return 1;
        }

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'role' => 'client',
        ]);

        $this->info('Client user created successfully!');
        return 0;
    }
}
