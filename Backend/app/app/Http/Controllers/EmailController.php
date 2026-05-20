<?php

namespace App\Http\Controllers;

use App\Models\Email;
use App\Models\PhoneNumber;
use App\Models\Location;
use App\Models\Contact;
use Illuminate\Http\Request;

class EmailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Email::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'mail'=> ['required', 'string', 'email'],
            'contact_id' => ['required', 'exists:contacts,id'],
        ]);

        $email = Email::create($validated);
        return response()->json($email, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Email $email)
    {
        return $email->load(['contact']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Email $email)
    {
        $validated=$request->validate([
            'mail'=> ['sometimes', 'required', 'string', 'email']
        ]);

        $email->update($validated);
        return response()->json($email, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Email $email)
    {
        $email->delete();
        return response()->json(null);
    }
}
