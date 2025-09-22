import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Clock, UserCheck, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Patient {
  id: number;
  name: string;
  queueNumber: number;
  status: 'waiting' | 'with-doctor' | 'completed';
  timeAdded: string;
}

const QueueManagement = () => {
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: "John Smith", queueNumber: 1, status: 'with-doctor', timeAdded: '09:30 AM' },
    { id: 2, name: "Mary Johnson", queueNumber: 2, status: 'waiting', timeAdded: '09:45 AM' },
    { id: 3, name: "Robert Wilson", queueNumber: 3, status: 'waiting', timeAdded: '10:15 AM' },
  ]);
  
  const [newPatientName, setNewPatientName] = useState("");
  const { toast } = useToast();

  const addPatient = () => {
    if (!newPatientName.trim()) {
      toast({ title: "Error", description: "Please enter patient name", variant: "destructive" });
      return;
    }

    const newPatient: Patient = {
      id: Date.now(),
      name: newPatientName,
      queueNumber: Math.max(...patients.map(p => p.queueNumber)) + 1,
      status: 'waiting',
      timeAdded: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setPatients([...patients, newPatient]);
    setNewPatientName("");
    toast({ title: "Patient Added", description: `${newPatientName} added to queue with number ${newPatient.queueNumber}` });
  };

  const updatePatientStatus = (id: number, status: Patient['status']) => {
    setPatients(patients.map(p => p.id === id ? { ...p, status } : p));
    const patient = patients.find(p => p.id === id);
    if (patient) {
      toast({ title: "Status Updated", description: `${patient.name} marked as ${status.replace('-', ' ')}` });
    }
  };

  const getStatusBadge = (status: Patient['status']) => {
    switch (status) {
      case 'waiting':
        return <Badge className="bg-warning text-warning-foreground">Waiting</Badge>;
      case 'with-doctor':
        return <Badge className="bg-primary text-primary-foreground">With Doctor</Badge>;
      case 'completed':
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
    }
  };

  const getStatusIcon = (status: Patient['status']) => {
    switch (status) {
      case 'waiting':
        return <Clock className="w-4 h-4" />;
      case 'with-doctor':
        return <UserCheck className="w-4 h-4" />;
      case 'completed':
        return <UserCheck className="w-4 h-4" />;
    }
  };

  const waitingCount = patients.filter(p => p.status === 'waiting').length;
  const withDoctorCount = patients.filter(p => p.status === 'with-doctor').length;

  return (
    <div className="space-y-6">
      {/* Queue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Waiting</p>
                <p className="text-3xl font-bold text-warning">{waitingCount}</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">With Doctor</p>
                <p className="text-3xl font-bold text-primary">{withDoctorCount}</p>
              </div>
              <UserCheck className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Today</p>
                <p className="text-3xl font-bold text-foreground">{patients.length}</p>
              </div>
              <Users className="w-8 h-8 text-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Patient */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Walk-in Patient
          </CardTitle>
          <CardDescription>Register a new patient and assign queue number</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                placeholder="Enter patient full name"
                value={newPatientName}
                onChange={(e) => setNewPatientName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPatient()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addPatient} className="bg-primary hover:bg-primary-dark">
                <Plus className="w-4 h-4 mr-2" />
                Add to Queue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Current Queue
          </CardTitle>
          <CardDescription>Manage patient queue and update status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No patients in queue</p>
              </div>
            ) : (
              patients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{patient.queueNumber}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">Added at {patient.timeAdded}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getStatusBadge(patient.status)}
                    
                    <div className="flex gap-2">
                      {patient.status === 'waiting' && (
                        <Button
                          size="sm"
                          onClick={() => updatePatientStatus(patient.id, 'with-doctor')}
                          className="bg-primary hover:bg-primary-dark text-xs"
                        >
                          Call In
                        </Button>
                      )}
                      {patient.status === 'with-doctor' && (
                        <Button
                          size="sm"
                          onClick={() => updatePatientStatus(patient.id, 'completed')}
                          className="bg-success hover:bg-success/90 text-xs"
                        >
                          Complete
                        </Button>
                      )}
                      {patient.status === 'completed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updatePatientStatus(patient.id, 'waiting')}
                          className="text-xs"
                        >
                          Requeue
                        </Button>
                      )}
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

export default QueueManagement;