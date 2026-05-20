<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Email extends Model
{
    use HasFactory;
    protected $fillable = [
    'mail',
    'contact_id',];

    public function contacts(){
        return $this->belongsTo(Contact::class);
    }
}
