<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Contact extends Model
{
    use HasFactory;
    
    protected $fillable = ['name','description', 'surname', 'favourited', 'location_id'];

    public function locations(){
        return $this->belongsTo(Location::class);
    }
    
    public function emails(){
        return $this->hasMany(Emails::class);
    }

    public function phoneNumbers(){
        return $this->hasMany(PhoneNumbers::class);
    }
}
