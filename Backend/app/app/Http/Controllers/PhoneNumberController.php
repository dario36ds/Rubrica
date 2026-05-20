<?php

namespace App\Http\Controllers;

use App\Models\Email;
use App\Models\Location;
use App\Models\Contact;
use App\Models\PhoneNumber;
use Illuminate\Http\Request;

class PhoneNumberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PhoneNumber::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'phone_number'=> ['required', 'string'],
            'contact_id' => ['required', 'exists:contacts,id'],
        ]);

        $phoneNumber = PhoneNumber::create($validated);
        return response()->json($phoneNumber, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(PhoneNumber $number)
    {
        return $number->load(['contact']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PhoneNumber $phoneNumbers)
    {
        $validated = $request->validate([
            'phone_number'=> ['sometimes', 'required', 'stirng'],
        ]);

        $phoneNumber->update($validated);
        return response()->json($phoneNumber, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PhoneNumber $phoneNumbers)
    {
        $phoneNumber->delete();
        return response()->json(null);
    }
}
