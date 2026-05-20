<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Contact extends Model
{
    use HasFactory;
    
    protected $fillable = ['name','description', 'surname', 'favourited'];

    public function locations(){
        return $this->hasMany(Location::class);
    }
    
    public function emails(){
        return $this->hasMany(Email::class);
    }

    public function phoneNumbers(){
        return $this->hasMany(PhoneNumber::class);
    }
}
