<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Location extends Model
{
        use HasFactory;
    protected $fillable = [
    'address',
    'contact_id'
    ];

    public function contact(){
        return $this->belongsTo(Contact::class);
    }
}
