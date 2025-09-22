import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Plus, Search, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: string;
}

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, patientName: "Alice Brown", doctorName: "Dr. Sarah Wilson", date: "2024-01-15", time: "09:00", status: 'scheduled', type: 'Consultation' },
    { id: 2, patientName: "David Lee", doctorName: "Dr. Michael Chen", date: "2024-01-15", time: "10:30", status: 'completed', type: 'Check-up' },
    { id: 3, patientName: "Emma Davis", doctorName: "Dr. Emily Rodriguez", date: "2024-01-15", time: "14:00", status: 'scheduled', type: 'Follow-up' },
    { id: 4, patientName: "Frank Miller", doctorName: "Dr. James Thompson", date: "2024-01-16", time: "11:00", status: 'cancelled', type: 'Surgery Consultation' },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const { toast } = useToast();

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || statusFilter === "all-statuses" || appointment.status === statusFilter;
    const matchesDate = !dateFilter || appointment.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-primary text-primary-foreground">Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'no-show':
        return <Badge className="bg-warning text-warning-foreground">No Show</Badge>;
    }
  };

  const updateAppointmentStatus = (id: number, status: Appointment['status']) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
    const appointment = appointments.find(a => a.id === id);
    if (appointment) {
      toast({ title: "Status Updated", description: `Appointment for ${appointment.patientName} marked as ${status.replace('-', ' ')}` });
    }
  };

  const todayAppointments = appointments.filter(a => a.date === new Date().toISOString().split('T')[0]);
  const upcomingAppointments = appointments.filter(a => new Date(a.date) > new Date());

  return (
    <div className="space-y-6">
      {/* Appointment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Appointments</p>
                <p className="text-3xl font-bold text-primary">{todayAppointments.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                <p className="text-3xl font-bold text-warning">{upcomingAppointments.length}</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Appointments</p>
                <p className="text-3xl font-bold text-foreground">{appointments.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search & Filter Appointments
              </CardTitle>
            </div>
            <Button className="bg-primary hover:bg-primary-dark">
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search by patient or doctor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-statuses">All statuses</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="no-show">No Show</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Appointment Schedule
          </CardTitle>
          <CardDescription>Manage patient appointments and scheduling</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No appointments found matching your criteria</p>
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{appointment.patientName}</h3>
                      <p className="text-sm text-muted-foreground">with {appointment.doctorName}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(appointment.date).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {appointment.time}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {appointment.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getStatusBadge(appointment.status)}
                    
                    <div className="flex gap-2">
                      {appointment.status === 'scheduled' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                            className="bg-success hover:bg-success/90 text-xs"
                          >
                            Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                            className="text-xs"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {appointment.status === 'cancelled' && (
                        <Button
                          size="sm"
                          onClick={() => updateAppointmentStatus(appointment.id, 'scheduled')}
                          className="bg-primary hover:bg-primary-dark text-xs"
                        >
                          Reschedule
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentManagement;