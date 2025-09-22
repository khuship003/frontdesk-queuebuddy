import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Search, Stethoscope, MapPin, Calendar, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  gender: string;
  location: string;
  availability: 'available' | 'busy' | 'off-duty';
  nextAvailable: string;
}

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: 1, name: "Dr. Sarah Wilson", specialization: "Cardiology", gender: "Female", location: "Room 101", availability: 'available', nextAvailable: 'Now' },
    { id: 2, name: "Dr. Michael Chen", specialization: "Pediatrics", gender: "Male", location: "Room 205", availability: 'busy', nextAvailable: '2:30 PM' },
    { id: 3, name: "Dr. Emily Rodriguez", specialization: "General Medicine", gender: "Female", location: "Room 103", availability: 'available', nextAvailable: 'Now' },
    { id: 4, name: "Dr. James Thompson", specialization: "Orthopedics", gender: "Male", location: "Room 301", availability: 'off-duty', nextAvailable: 'Tomorrow 9:00 AM' },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const { toast } = useToast();

  const specializations = [...new Set(doctors.map(d => d.specialization))];
  
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = !specializationFilter || doctor.specialization === specializationFilter;
    const matchesAvailability = !availabilityFilter || doctor.availability === availabilityFilter;
    
    return matchesSearch && matchesSpecialization && matchesAvailability;
  });

  const getAvailabilityBadge = (availability: Doctor['availability']) => {
    switch (availability) {
      case 'available':
        return <Badge className="bg-success text-success-foreground">Available</Badge>;
      case 'busy':
        return <Badge className="bg-warning text-warning-foreground">Busy</Badge>;
      case 'off-duty':
        return <Badge variant="secondary">Off Duty</Badge>;
    }
  };

  const updateAvailability = (id: number, availability: Doctor['availability']) => {
    setDoctors(doctors.map(d => d.id === id ? { ...d, availability } : d));
    const doctor = doctors.find(d => d.id === id);
    if (doctor) {
      toast({ title: "Status Updated", description: `${doctor.name} marked as ${availability.replace('-', ' ')}` });
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search & Filter Doctors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label>Specialization</Label>
              <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All specializations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All specializations</SelectItem>
                  {specializations.map(spec => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Availability</Label>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="off-duty">Off Duty</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Doctor List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5" />
                Medical Staff Directory
              </CardTitle>
              <CardDescription>Manage doctor profiles and availability</CardDescription>
            </div>
            <Button className="bg-primary hover:bg-primary-dark">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Doctor
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Stethoscope className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                      </div>
                    </div>
                    {getAvailabilityBadge(doctor.availability)}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Next available: {doctor.nextAvailable}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {doctor.availability !== 'available' && (
                      <Button
                        size="sm"
                        onClick={() => updateAvailability(doctor.id, 'available')}
                        className="bg-success hover:bg-success/90 text-xs"
                      >
                        Mark Available
                      </Button>
                    )}
                    {doctor.availability !== 'busy' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateAvailability(doctor.id, 'busy')}
                        className="text-xs"
                      >
                        Mark Busy
                      </Button>
                    )}
                    {doctor.availability !== 'off-duty' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateAvailability(doctor.id, 'off-duty')}
                        className="text-xs"
                      >
                        Off Duty
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredDoctors.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Stethoscope className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No doctors found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorManagement;