<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PhoneNumber extends Model
{
    use HasFactory;
    protected $fillable = [
    'phone_number', 'contact_id'
    ];

    public function contact(){
        return $this->belongsTo(Contact::class);
    }
}
