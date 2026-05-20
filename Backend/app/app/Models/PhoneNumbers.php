<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PhoneNumbers extends Model
{
    use HasFactory;
    protected $fillable = [
    'phone_number', 'contact_id'
    ];

    public function contacts(){
        return $this->belongsTo(Contacts::class);
    }
}
