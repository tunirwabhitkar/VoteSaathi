'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/translations';
import { indianStates } from '@/lib/data';

export default function RegistrationSimulator() {
  const { language } = useAppStore();
  const t = translations[language];

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [refId, setRefId] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    state: '',
    district: '',
    address: '',
    pincode: '',
    epicNo: ''
  });

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-50">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 rounded-2xl border border-emerald-200 shadow-lg max-w-md w-full">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.simSuccessTitle}</h2>
          <p className="text-slate-600 mb-6 text-sm">
            {t.simSuccessDesc}
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-left">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-1">Generated Reference ID</p>
            <p className="text-lg font-mono text-slate-900 font-semibold">VOTER-{refId}-IND</p>
          </div>
          <Button onClick={() => { setSuccess(false); setStep(1); setFormData({ firstName: '', lastName: '', dob: '', gender: '', state: '', district: '', address: '', pincode: '', epicNo: '' }); }} className="w-full">
            {t.simAgain}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 h-full overflow-y-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-slate-900">{t.simTitle}</h1>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none shadow-none">Powered by Shadcn</Badge>
        </div>
        <p className="text-slate-600 text-sm">{t.simSubtitle}</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
          <span>{t.simStep} {step} {t.simOf} 3</span>
          <span>{Math.round((step / 3) * 100)}% {t.simCompleted}</span>
        </div>
        <Progress value={(step / 3) * 100} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ duration: 0.2 }}>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                {step === 1 && <><Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{t.simPart1}</Badge> {t.simPart1Desc}</>}
                {step === 2 && <><Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">{t.simPart2}</Badge> {t.simPart2Desc}</>}
                {step === 3 && <><Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">{t.simPart3}</Badge> {t.simPart3Desc}</>}
              </CardTitle>
              <CardDescription>
                {step === 1 && 'Enter your basic identity information as per official records.'}
                {step === 2 && 'Provide your current residential address for constituency allocation.'}
                {step === 3 && 'Review and electronically sign your application.'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="e.g. Rahul" value={formData.firstName} onChange={(e) => updateForm('firstName', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="e.g. Sharma" value={formData.lastName} onChange={(e) => updateForm('lastName', e.target.value)} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" value={formData.dob} onChange={(e) => updateForm('dob', e.target.value)} />
                    <p className="text-[10px] text-slate-500 mt-1">You must be at least 18 years old to register.</p>
                  </div>

                  <div className="space-y-3">
                    <Label>Gender</Label>
                    <RadioGroup value={formData.gender} onValueChange={(val) => updateForm('gender', val)} className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="r1" />
                        <Label htmlFor="r1" className="cursor-pointer font-normal">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="r2" />
                        <Label htmlFor="r2" className="cursor-pointer font-normal">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="third" id="r3" />
                        <Label htmlFor="r3" className="cursor-pointer font-normal">Third Gender</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>State / Union Territory</Label>
                    <Select value={formData.state} onValueChange={(val: string | null) => val && updateForm('state', val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((stateName) => (
                          <SelectItem key={stateName} value={stateName}>
                            {stateName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>District</Label>
                    <Input placeholder="Enter your district" value={formData.district} onChange={(e) => updateForm('district', e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label>Full Address</Label>
                    <Input placeholder="House No, Street, Locality" value={formData.address} onChange={(e) => updateForm('address', e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label>PIN Code</Label>
                    <Input 
                      placeholder="6-digit PIN" 
                      value={formData.pincode} 
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, ''); // Allow only numbers
                        if (val.length <= 6) updateForm('pincode', val);
                      }} 
                      maxLength={6}
                      inputMode="numeric"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-2 text-sm text-blue-900">
                    <p><strong>Name:</strong> {formData.firstName} {formData.lastName || '(Not provided)'}</p>
                    <p><strong>DOB:</strong> {formData.dob || '(Not provided)'}</p>
                    <p><strong>State:</strong> {formData.state || '(Not provided)'}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Label className="text-base">Declaration</Label>
                    <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200 leading-relaxed">
                      I hereby declare that to the best of my knowledge and belief:
                      <ul className="list-disc ml-5 mt-2 space-y-1">
                        <li>I am a citizen of India and place of my birth is in India.</li>
                        <li>I am ordinarily resident at the address given above.</li>
                        <li>I have not applied for the inclusion of my name in the electoral roll for any other constituency.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between border-t border-slate-100 pt-6">
              <Button variant="outline" onClick={handlePrev} disabled={step === 1 || isSubmitting}>
                {t.simPrev}
              </Button>
              {step < 3 ? (
                <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {t.simNext}
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  {isSubmitting ? t.simSubmitting : t.simSubmit}
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
