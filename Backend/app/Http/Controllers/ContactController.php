<?php

namespace App\Http\Controllers;

use App\Models\Email;
use App\Models\PhoneNumber;
use App\Models\Location;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Contact::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated=$request->validate([
            'name'=> ['required', 'string', 'max:255'],
            'surname'=> ['required', 'string', 'max:255'],
            'description'=> ['nullable', 'string', 'max:255'],
            'favourited' => ['boolean'],
        ]);

        $contact = Contact::create($validated);
        return response()->json($contact, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        return $contact->load(['phoneNumbers', 'emails', 'locations']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $validated=$request->validate([
            'name'=> ['sometimes', 'required', 'string', 'max:255'],
            'surname'=> ['sometimes', 'required', 'string', 'max:255'],
            'description'=> ['sometimes', 'string', 'max:255'],
            'favourited' => ['sometimes', 'boolean'],
        ]);

        $contact->update($validated);
        return response()->json($contact, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
        return response()->json(null);
    }
}
