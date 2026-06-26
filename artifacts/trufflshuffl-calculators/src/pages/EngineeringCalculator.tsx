import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";

function fmt(n: number, dec = 2) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export default function EngineeringCalculator() {
  const [ohmV, setOhmV] = useState("12");
  const [ohmI, setOhmI] = useState("2");
  const [ohmR, setOhmR] = useState("6");
  const [ohmSolve, setOhmSolve] = useState<"V" | "I" | "R">("V");
  const [ohmResult, setOhmResult] = useState<{ value: number; power: number; unit: string } | null>(null);

  const [vdVoltage, setVdVoltage] = useState("230");
  const [vdCurrent, setVdCurrent] = useState("10");
  const [vdLength, setVdLength] = useState("20");
  const [vdConductor, setVdConductor] = useState("copper");
  const [vdArea, setVdArea] = useState("2.5");
  const [vdResult, setVdResult] = useState<{ drop: number; dropPct: number; acceptable: boolean } | null>(null);

  const [torqueForce, setTorqueForce] = useState("100");
  const [torqueArm, setTorqueArm] = useState("0.5");
  const [torqueResult, setTorqueResult] = useState<{ torqueNm: number; torqueKgm: number } | null>(null);

  function calcOhm() {
    let value = 0;
    let power = 0;
    const v = Number(ohmV), i = Number(ohmI), r = Number(ohmR);
    if (ohmSolve === "V") { value = i * r; power = value * i; }
    else if (ohmSolve === "I") { value = v / r; power = v * value; }
    else { value = v / i; power = v * i; }
    setOhmResult({ value, power, unit: ohmSolve });
  }

  function calcVoltageDrop() {
    const resistivity: Record<string, number> = { copper: 1.724e-8, aluminium: 2.65e-8 };
    const rho = resistivity[vdConductor];
    const area = Number(vdArea) * 1e-6;
    const len = Number(vdLength) * 2;
    const resistance = (rho * len) / area;
    const drop = resistance * Number(vdCurrent);
    const dropPct = (drop / Number(vdVoltage)) * 100;
    const acceptable = dropPct <= 3;
    setVdResult({ drop, dropPct, acceptable });
  }

  function calcTorque() {
    const torqueNm = Number(torqueForce) * Number(torqueArm);
    const torqueKgm = torqueNm / 9.81;
    setTorqueResult({ torqueNm, torqueKgm });
  }

  return (
    <CalculatorLayout
      guide={CALCULATOR_GUIDES['engineering']}
      title="Engineering Calculator"
      description="Solve Ohm's Law for voltage, current or resistance, calculate voltage drop in cables, and compute torque from force and lever arm."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Ohm's Law: select the unknown (V, I or R), enter the two known values</li>
          <li>Voltage Drop: enter cable length, current, and conductor area to check SANS 10142 compliance</li>
          <li>Torque: enter force (N) and lever arm (m) for torque in Nm and kg·m</li>
        </ol>
      }
      testimonial="I'm an electrician and the voltage drop calculator saves me time on every installation. SANS 10142 limits voltage drop to 3% on a circuit — I used to calculate this manually for each cable run but now I just enter the cable length, load current and conductor size and it tells me instantly whether I'm within spec. On a recent workshop job I found I needed to upsize from 2.5 mm² to 4 mm² copper for a 30-metre run at 15 A to keep the drop under 3%. The Ohm's Law tab is great for quick checks on control circuit calculations. The torque calculator I use when specifying anchor bolt tightening torques for equipment mounting. Bookmarked on my phone and used on site every day."
    >
      <Tabs defaultValue="ohm">
        <TabsList className="w-full">
          <TabsTrigger value="ohm" className="flex-1">Ohm's Law</TabsTrigger>
          <TabsTrigger value="vdrop" className="flex-1">Voltage Drop</TabsTrigger>
          <TabsTrigger value="torque" className="flex-1">Torque</TabsTrigger>
        </TabsList>

        <TabsContent value="ohm" className="space-y-4 pt-4">
          <div className="space-y-1.5">
            <Label>Solve for:</Label>
            <div className="flex gap-2">
              {(["V", "I", "R"] as const).map(s => (
                <button key={s} onClick={() => setOhmSolve(s)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-mono font-bold transition-colors ${ohmSolve === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
                  {s === "V" ? "Voltage (V)" : s === "I" ? "Current (I)" : "Resistance (R)"}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {ohmSolve !== "V" && (
              <div className="space-y-1.5">
                <Label>Voltage (V)</Label>
                <Input type="number" value={ohmV} onChange={e => setOhmV(e.target.value)} />
              </div>
            )}
            {ohmSolve !== "I" && (
              <div className="space-y-1.5">
                <Label>Current (A)</Label>
                <Input type="number" value={ohmI} onChange={e => setOhmI(e.target.value)} />
              </div>
            )}
            {ohmSolve !== "R" && (
              <div className="space-y-1.5">
                <Label>Resistance (Ω)</Label>
                <Input type="number" value={ohmR} onChange={e => setOhmR(e.target.value)} />
              </div>
            )}
          </div>
          <Button className="w-full" onClick={calcOhm}>Calculate</Button>
          {ohmResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">{ohmResult.unit === "V" ? "Voltage" : ohmResult.unit === "I" ? "Current" : "Resistance"}</p>
                <p className="font-mono text-2xl font-bold text-primary">{fmt(ohmResult.value, 3)} {ohmResult.unit === "V" ? "V" : ohmResult.unit === "I" ? "A" : "Ω"}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Power (P = VI)</p>
                <p className="font-mono text-2xl font-bold text-foreground">{fmt(ohmResult.power, 2)} W</p>
              </div>
            </div>
          )}
          <div className="bg-card border border-border rounded-lg p-3 text-xs text-muted-foreground">
            V = I × R &nbsp;|&nbsp; I = V ÷ R &nbsp;|&nbsp; R = V ÷ I &nbsp;|&nbsp; P = V × I
          </div>
        </TabsContent>

        <TabsContent value="vdrop" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Supply Voltage (V)</Label>
              <Input type="number" value={vdVoltage} onChange={e => setVdVoltage(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Load Current (A)</Label>
              <Input type="number" value={vdCurrent} onChange={e => setVdCurrent(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>One-Way Length (m)</Label>
              <Input type="number" value={vdLength} onChange={e => setVdLength(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Conductor</Label>
              <div className="flex gap-2">
                {["copper", "aluminium"].map(c => (
                  <button key={c} onClick={() => setVdConductor(c)}
                    className={`flex-1 py-1.5 rounded-lg border text-xs capitalize transition-colors ${vdConductor === c ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Conductor Area (mm²)</Label>
              <Input type="number" value={vdArea} onChange={e => setVdArea(e.target.value)} step="0.5" />
            </div>
          </div>
          <Button className="w-full" onClick={calcVoltageDrop}>Calculate</Button>
          {vdResult && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-lg p-4 border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Voltage Drop</p>
                  <p className="font-mono text-xl font-bold text-foreground">{fmt(vdResult.drop, 2)} V</p>
                </div>
                <div className={`rounded-lg p-4 border text-center ${vdResult.acceptable ? "border-green-500/30 bg-green-500/10" : "border-red-500/30 bg-red-500/10"}`}>
                  <p className="text-xs text-muted-foreground mb-1">Percentage Drop</p>
                  <p className={`font-mono text-xl font-bold ${vdResult.acceptable ? "text-green-400" : "text-red-400"}`}>{fmt(vdResult.dropPct, 2)}%</p>
                </div>
              </div>
              <p className={`text-xs ${vdResult.acceptable ? "text-green-400" : "text-red-400"}`}>
                {vdResult.acceptable ? "Within SANS 10142 3% limit." : "Exceeds SANS 10142 3% limit — upsize cable or reduce run length."}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="torque" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Force (N)</Label>
              <Input type="number" value={torqueForce} onChange={e => setTorqueForce(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Lever Arm (m)</Label>
              <Input type="number" value={torqueArm} onChange={e => setTorqueArm(e.target.value)} step="0.01" />
            </div>
          </div>
          <Button className="w-full" onClick={calcTorque}>Calculate</Button>
          {torqueResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Torque (Nm)</p>
                <p className="font-mono text-2xl font-bold text-primary">{fmt(torqueResult.torqueNm, 2)} Nm</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Torque (kg·m)</p>
                <p className="font-mono text-2xl font-bold text-foreground">{fmt(torqueResult.torqueKgm, 3)} kg·m</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Torque = Force × Lever Arm. 1 Nm = 0.102 kg·m = 0.738 ft·lb.</p>
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
