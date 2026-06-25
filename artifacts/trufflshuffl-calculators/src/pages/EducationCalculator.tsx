import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function fmt(n: number, dec = 2) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

const GRADE_POINTS: Record<string, number> = {
  "A+ / A (75–100%)": 4.0, "A- (70–74%)": 3.7, "B+ (65–69%)": 3.3,
  "B (60–64%)": 3.0, "B- (55–59%)": 2.7, "C+ (50–54%)": 2.3,
  "C (45–49%)": 2.0, "D (40–44%)": 1.0, "F (below 40%)": 0.0,
};

type Course = { name: string; grade: string; credits: string };

export default function EducationCalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { name: "Mathematics", grade: "A- (70–74%)", credits: "16" },
    { name: "Physics", grade: "B+ (65–69%)", credits: "16" },
    { name: "English", grade: "A+ / A (75–100%)", credits: "8" },
    { name: "History", grade: "B (60–64%)", credits: "8" },
  ]);
  const [gpaResult, setGpaResult] = useState<{ gpa: number; totalCredits: number; weightedPoints: number } | null>(null);

  const [currentAvg, setCurrentAvg] = useState("62");
  const [currentWeight, setCurrentWeight] = useState("70");
  const [targetAvg, setTargetAvg] = useState("65");
  const [finalWeight, setFinalWeight] = useState("30");
  const [examResult, setExamResult] = useState<{ needed: number; possible: boolean } | null>(null);

  const [studySubjects, setStudySubjects] = useState("6");
  const [weeksLeft, setWeeksLeft] = useState("4");
  const [hoursPerDay, setHoursPerDay] = useState("3");
  const [studyResult, setStudyResult] = useState<{ totalHours: number; hoursPerSubject: number } | null>(null);

  function calcGPA() {
    let totalCredits = 0;
    let weightedPoints = 0;
    courses.forEach(c => {
      const cr = Number(c.credits);
      const gp = GRADE_POINTS[c.grade] ?? 0;
      totalCredits += cr;
      weightedPoints += cr * gp;
    });
    const gpa = totalCredits > 0 ? weightedPoints / totalCredits : 0;
    setGpaResult({ gpa, totalCredits, weightedPoints });
  }

  function calcExam() {
    const curr = Number(currentAvg);
    const cw = Number(currentWeight) / 100;
    const target = Number(targetAvg);
    const fw = Number(finalWeight) / 100;
    const needed = (target - curr * cw) / fw;
    setExamResult({ needed, possible: needed <= 100 });
  }

  function calcStudy() {
    const days = Number(weeksLeft) * 7;
    const totalHours = days * Number(hoursPerDay);
    const hoursPerSubject = totalHours / Number(studySubjects);
    setStudyResult({ totalHours, hoursPerSubject });
  }

  function addCourse() {
    setCourses(prev => [...prev, { name: "", grade: "B (60–64%)", credits: "8" }]);
  }

  function updateCourse(i: number, field: keyof Course, value: string) {
    setCourses(prev => prev.map((c, idx) => idx === i ? { ...c, [field]: value } : c));
  }

  function removeCourse(i: number) {
    setCourses(prev => prev.filter((_, idx) => idx !== i));
  }

  const gradeOptions = Object.keys(GRADE_POINTS);

  return (
    <CalculatorLayout
      title="Education Calculator"
      description="Calculate your GPA, determine the exam score you need to reach your target average, and plan your study hours across subjects."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>GPA: add your subjects with credits and letter grades</li>
          <li>Final Exam: enter current average and exam weight to find the score you need</li>
          <li>Study Hours: enter subjects, weeks, and daily hours for a study plan</li>
        </ol>
      }
      testimonial="I was stressing about my year-end examinations at university and this calculator gave me clarity. The GPA tab showed me exactly where I stood — a 2.94 out of 4.0 — and which subjects were dragging me down. The final exam calculator was the most useful: I entered my current semester mark of 58% (weighted at 60%) and my target of 65% to see I needed a 75% in the final exam, which was actually achievable. The study hours tab helped me divide my remaining 84 study hours across six subjects — 14 hours each — so I could build a realistic timetable. No more vague cramming. I ended with a 67% average and I'm convinced this structured approach made the difference. Great for matric students too."
    >
      <Tabs defaultValue="gpa">
        <TabsList className="w-full">
          <TabsTrigger value="gpa" className="flex-1">GPA</TabsTrigger>
          <TabsTrigger value="exam" className="flex-1">Final Exam Needed</TabsTrigger>
          <TabsTrigger value="study" className="flex-1">Study Hours</TabsTrigger>
        </TabsList>

        <TabsContent value="gpa" className="space-y-3 pt-4">
          <div className="space-y-2">
            {courses.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input placeholder="Subject" value={c.name} onChange={e => updateCourse(i, "name", e.target.value)} className="flex-1 text-sm" />
                <select value={c.grade} onChange={e => updateCourse(i, "grade", e.target.value)}
                  className="bg-background border border-border text-foreground text-xs rounded-md px-2 py-2 focus:outline-none focus:ring-1 focus:ring-primary">
                  {gradeOptions.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <Input type="number" placeholder="Credits" value={c.credits} onChange={e => updateCourse(i, "credits", e.target.value)} className="w-20 text-sm" />
                <button onClick={() => removeCourse(i)} className="text-muted-foreground hover:text-red-400 text-lg px-1">×</button>
              </div>
            ))}
          </div>
          <button onClick={addCourse} className="text-xs text-primary hover:underline">+ Add subject</button>
          <Button className="w-full" onClick={calcGPA}>Calculate GPA</Button>
          {gpaResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center col-span-1">
                <p className="text-xs text-muted-foreground mb-1">GPA</p>
                <p className="font-mono text-2xl font-bold text-primary">{fmt(gpaResult.gpa, 2)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Credits</p>
                <p className="font-mono text-xl font-bold">{gpaResult.totalCredits}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Classification</p>
                <p className="font-mono text-sm font-bold">{gpaResult.gpa >= 3.5 ? "Distinction" : gpaResult.gpa >= 3.0 ? "Merit" : gpaResult.gpa >= 2.0 ? "Pass" : "Below Pass"}</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="exam" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Current Average (%)</Label>
              <Input type="number" value={currentAvg} onChange={e => setCurrentAvg(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Current Work Weight (%)</Label>
              <Input type="number" value={currentWeight} onChange={e => setCurrentWeight(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Target Final Average (%)</Label>
              <Input type="number" value={targetAvg} onChange={e => setTargetAvg(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Final Exam Weight (%)</Label>
              <Input type="number" value={finalWeight} onChange={e => setFinalWeight(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcExam}>Calculate</Button>
          {examResult && (
            <div className={`rounded-lg p-4 border text-center ${examResult.possible ? "border-primary/30 bg-background" : "border-red-500/30 bg-red-500/10"}`}>
              <p className="text-xs text-muted-foreground mb-1">Exam Score Needed</p>
              <p className={`font-mono text-3xl font-bold ${examResult.possible ? "text-primary" : "text-red-400"}`}>{fmt(examResult.needed, 1)}%</p>
              <p className="text-xs text-muted-foreground mt-2">{examResult.possible ? "This score is achievable — focus and prepare well." : "This score is not achievable — consider requesting a supplementary exam or adjusting your target."}</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="study" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Subjects</Label>
              <Input type="number" value={studySubjects} onChange={e => setStudySubjects(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Weeks Left</Label>
              <Input type="number" value={weeksLeft} onChange={e => setWeeksLeft(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Hours per Day</Label>
              <Input type="number" value={hoursPerDay} onChange={e => setHoursPerDay(e.target.value)} step="0.5" />
            </div>
          </div>
          <Button className="w-full" onClick={calcStudy}>Calculate</Button>
          {studyResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Study Hours</p>
                <p className="font-mono text-2xl font-bold text-primary">{fmt(studyResult.totalHours, 0)} hrs</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Hours per Subject</p>
                <p className="font-mono text-2xl font-bold text-foreground">{fmt(studyResult.hoursPerSubject, 1)} hrs</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
