<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Location extends Model
{
        use HasFactory;
    protected $fillable = [
    'address',
    ];

    public function contacts(){
        return $this->hasMany(Contacts::class);
    }
}
