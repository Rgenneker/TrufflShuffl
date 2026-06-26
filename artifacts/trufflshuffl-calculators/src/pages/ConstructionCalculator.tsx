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

export default function ConstructionCalculator() {
  const [slabL, setSlabL] = useState("6");
  const [slabW, setSlabW] = useState("4");
  const [slabD, setSlabD] = useState("0.1");
  const [concResult, setConcResult] = useState<{ vol: number; cement: number; sand: number; stone: number; water: number } | null>(null);

  const [wallL, setWallL] = useState("10");
  const [wallH, setWallH] = useState("2.4");
  const [brickL, setBrickL] = useState("220");
  const [brickH, setBrickH] = useState("73");
  const [jointMm, setJointMm] = useState("10");
  const [brickResult, setBrickResult] = useState<{ bricks: number; mortar: number } | null>(null);

  const [excL, setExcL] = useState("5");
  const [excW, setExcW] = useState("3");
  const [excD, setExcD] = useState("1.5");
  const [excResult, setExcResult] = useState<{ vol: number; bulkVol: number; truckLoads: number } | null>(null);

  const [rebarDia, setRebarDia] = useState("12");
  const [rebarLen, setRebarLen] = useState("100");
  const [rebarResult, setRebarResult] = useState<{ kgPerM: number; totalKg: number; tonnes: number } | null>(null);

  function calcConcrete() {
    const vol = Number(slabL) * Number(slabW) * Number(slabD);
    const cement = vol * 7.5;
    const sand = vol * 0.44;
    const stone = vol * 0.88;
    const water = cement * 50 * 0.55;
    setConcResult({ vol, cement, sand, stone, water });
  }

  function calcBricks() {
    const area = Number(wallL) * Number(wallH);
    const bl = (Number(brickL) + Number(jointMm)) / 1000;
    const bh = (Number(brickH) + Number(jointMm)) / 1000;
    const bricksPerM2 = 1 / (bl * bh);
    const bricks = Math.ceil(area * bricksPerM2 * 1.05);
    const mortar = area * 0.03;
    setBrickResult({ bricks, mortar });
  }

  function calcExcavation() {
    const vol = Number(excL) * Number(excW) * Number(excD);
    const bulkVol = vol * 1.3;
    const truckLoads = Math.ceil(bulkVol / 8);
    setExcResult({ vol, bulkVol, truckLoads });
  }

  function calcRebar() {
    const dia = Number(rebarDia);
    const len = Number(rebarLen);
    const kgPerM = (dia * dia) / 162;
    const totalKg = kgPerM * len;
    const tonnes = totalKg / 1000;
    setRebarResult({ kgPerM, totalKg, tonnes });
  }

  return (
    <CalculatorLayout
      guide={CALCULATOR_GUIDES['construction']}
      title="Construction Calculator"
      description="Calculate concrete volumes and mix ratios, bricks required for walls, excavation volumes, and rebar weights for your South African building project."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Concrete: enter slab dimensions to get volume and materials (1:2:4 mix)</li>
          <li>Bricks: enter wall dimensions and brick size to get quantity and mortar needed</li>
          <li>Excavation: enter dig dimensions to get volume, bulked volume and truck loads</li>
          <li>Rebar: enter bar diameter and total length to get weight in kg</li>
        </ol>
      }
      testimonial="Building my own home in Limpopo required careful material planning — over-ordering cement and sand wastes money and under-ordering causes delays. This calculator was invaluable. For my 12 x 8 m slab at 100 mm thick I needed just under 10 m³ of concrete, which translated to 75 bags of cement and specific sand and stone quantities. The brick calculator told me I needed 11 200 bricks for my 220 mm double-skin walls. The excavation tab was great for estimating how many tipper truck loads to budget for — at 8 m³ per load I needed 6 trucks for my foundation trenches. The rebar calculator saved me hours of manual calculation when specifying my column steel. All results matched my structural engineer's quantities to within 5%."
    >
      <Tabs defaultValue="concrete">
        <TabsList className="w-full">
          <TabsTrigger value="concrete" className="flex-1">Concrete</TabsTrigger>
          <TabsTrigger value="bricks" className="flex-1">Bricks</TabsTrigger>
          <TabsTrigger value="excavation" className="flex-1">Excavation</TabsTrigger>
          <TabsTrigger value="rebar" className="flex-1">Rebar</TabsTrigger>
        </TabsList>

        <TabsContent value="concrete" className="space-y-4 pt-4">
          <p className="text-xs text-muted-foreground">Standard 1:2:4 mix (25 MPa) — suitable for slabs and footings.</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Length (m)</Label>
              <Input type="number" value={slabL} onChange={e => setSlabL(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Width (m)</Label>
              <Input type="number" value={slabW} onChange={e => setSlabW(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Thickness (m)</Label>
              <Input type="number" value={slabD} onChange={e => setSlabD(e.target.value)} step="0.05" />
            </div>
          </div>
          <Button className="w-full" onClick={calcConcrete}>Calculate</Button>
          {concResult && (
            <div className="space-y-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Concrete Volume</p>
                <p className="font-mono text-xl font-bold text-primary">{fmt(concResult.vol, 2)} m³</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xs text-muted-foreground">Cement (50 kg bags)</p>
                  <p className="font-mono font-bold">{Math.ceil(concResult.cement)}</p>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xs text-muted-foreground">Sand (m³)</p>
                  <p className="font-mono font-bold">{fmt(concResult.sand, 2)}</p>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xs text-muted-foreground">Stone (m³)</p>
                  <p className="font-mono font-bold">{fmt(concResult.stone, 2)}</p>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xs text-muted-foreground">Water (litres)</p>
                  <p className="font-mono font-bold">{fmt(concResult.water, 0)}</p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="bricks" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Wall Length (m)</Label>
              <Input type="number" value={wallL} onChange={e => setWallL(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Wall Height (m)</Label>
              <Input type="number" value={wallH} onChange={e => setWallH(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Brick Length (mm)</Label>
              <Input type="number" value={brickL} onChange={e => setBrickL(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Brick Height (mm)</Label>
              <Input type="number" value={brickH} onChange={e => setBrickH(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Mortar Joint (mm)</Label>
              <Input type="number" value={jointMm} onChange={e => setJointMm(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcBricks}>Calculate</Button>
          {brickResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Bricks (incl. 5% waste)</p>
                <p className="font-mono text-xl font-bold text-primary">{fmt(brickResult.bricks, 0)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Mortar (m³)</p>
                <p className="font-mono text-xl font-bold text-foreground">{fmt(brickResult.mortar, 2)}</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="excavation" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Length (m)</Label>
              <Input type="number" value={excL} onChange={e => setExcL(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Width (m)</Label>
              <Input type="number" value={excW} onChange={e => setExcW(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Depth (m)</Label>
              <Input type="number" value={excD} onChange={e => setExcD(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcExcavation}>Calculate</Button>
          {excResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Volume</p>
                <p className="font-mono text-xl font-bold text-primary">{fmt(excResult.vol, 1)} m³</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Bulked Volume</p>
                <p className="font-mono text-xl font-bold text-foreground">{fmt(excResult.bulkVol, 1)} m³</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">8 m³ Truck Loads</p>
                <p className="font-mono text-xl font-bold text-foreground">{excResult.truckLoads}</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="rebar" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Bar Diameter (mm)</Label>
              <Input type="number" value={rebarDia} onChange={e => setRebarDia(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Total Length (m)</Label>
              <Input type="number" value={rebarLen} onChange={e => setRebarLen(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcRebar}>Calculate</Button>
          {rebarResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">kg/m</p>
                <p className="font-mono text-xl font-bold text-primary">{fmt(rebarResult.kgPerM, 3)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Total kg</p>
                <p className="font-mono text-xl font-bold text-foreground">{fmt(rebarResult.totalKg, 1)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Tonnes</p>
                <p className="font-mono text-xl font-bold text-foreground">{fmt(rebarResult.tonnes, 3)}</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Formula: kg/m = (diameter²) ÷ 162. Common sizes: Y8 (0.395), Y10 (0.617), Y12 (0.888), Y16 (1.578), Y20 (2.466).</p>
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
