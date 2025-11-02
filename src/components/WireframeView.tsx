import { useState } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  ShoppingCart, 
  Plus, 
  Archive, 
  Trash2, 
  MoreVertical, 
  ArrowLeft,
  Edit2,
  UserPlus,
  UserMinus,
  Check,
  Circle
} from 'lucide-react';

// Mockup fotografie uživatelů
const USERS = [
  {
    id: '1',
    name: 'Jan Novák',
    avatar: 'https://images.unsplash.com/photo-1719257751404-1dea075324bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150&h=150'
  },
  {
    id: '2',
    name: 'Marie Nováková',
    avatar: 'https://images.unsplash.com/photo-1690444963408-9573a17a8058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150&h=150'
  },
  {
    id: '3',
    name: 'Petr Svoboda',
    avatar: 'https://images.unsplash.com/photo-1684864271138-37a5118f8561?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150&h=150'
  },
  {
    id: '4',
    name: 'Jana Dvořáková',
    avatar: 'https://images.unsplash.com/photo-1561065533-316e3142d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150&h=150'
  }
];

export function WireframeView() {
  const [activeRoute, setActiveRoute] = useState<'overview' | 'detail'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header s přepínačem routes */}
        <div className="mb-8">
          <h1 className="mb-2">Wireframe - Nákupní seznam</h1>
          <p className="text-muted-foreground mb-6">
            Interaktivní wireframe s reálnými fotografiemi uživatelů
          </p>

          <Tabs value={activeRoute} onValueChange={(v) => setActiveRoute(v as any)}>
            <TabsList>
              <TabsTrigger value="overview">Route 1: Přehled seznamů (/)</TabsTrigger>
              <TabsTrigger value="detail">Route 2: Detail seznamu (/list/:id)</TabsTrigger>
            </TabsList>

            {/* Route 1: Přehled seznamů */}
            <TabsContent value="overview" className="mt-8">
              <div className="bg-white rounded-xl shadow-2xl p-8 border-2 border-gray-200">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                        <ShoppingCart className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2>Moje nákupní seznamy</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <ImageWithFallback 
                            src={USERS[0].avatar}
                            alt={USERS[0].name}
                            className="w-6 h-6 rounded-full object-cover border-2 border-white shadow"
                          />
                          <p className="text-muted-foreground">
                            {USERS[0].name}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button className="gap-2 shadow-md">
                      <Plus className="w-5 h-5" />
                      Nový seznam
                    </Button>
                  </div>
                </div>

                {/* Filter tabs */}
                <div className="mb-6">
                  <div className="inline-flex bg-muted rounded-lg p-1">
                    <button className="px-4 py-2 rounded-md bg-white shadow-sm">
                      Aktivní seznamy
                    </button>
                    <button className="px-4 py-2 rounded-md text-muted-foreground">
                      Archivované
                    </button>
                  </div>
                </div>

                {/* Shopping Lists Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* List Card 1 */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-xl transition-all hover:border-blue-300">
                    <div className="flex items-start justify-between mb-4">
                      <h3>Týdenní nákup</h3>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <ImageWithFallback 
                            src={USERS[0].avatar}
                            alt={USERS[0].name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                          />
                          <ImageWithFallback 
                            src={USERS[1].avatar}
                            alt={USERS[1].name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                          />
                        </div>
                        <span className="text-muted-foreground">2 členové</span>
                        <span className="ml-auto bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                          Vlastník
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span>Položky</span>
                          <span>5 / 12</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                        </div>
                      </div>

                      <p className="text-muted-foreground">
                        Vytvořeno: 10. 10. 2025
                      </p>
                    </div>
                  </div>

                  {/* List Card 2 */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-xl transition-all hover:border-blue-300">
                    <div className="flex items-start justify-between mb-4">
                      <h3>Party zítra</h3>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <ImageWithFallback 
                            src={USERS[1].avatar}
                            alt={USERS[1].name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                          />
                          <ImageWithFallback 
                            src={USERS[0].avatar}
                            alt={USERS[0].name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                          />
                          <ImageWithFallback 
                            src={USERS[2].avatar}
                            alt={USERS[2].name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                          />
                        </div>
                        <span className="text-muted-foreground">3 členové</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span>Položky</span>
                          <span>8 / 8</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>

                      <p className="text-muted-foreground">
                        Vytvořeno: 12. 10. 2025
                      </p>
                    </div>
                  </div>

                  {/* List Card 3 */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-xl transition-all hover:border-blue-300">
                    <div className="flex items-start justify-between mb-4">
                      <h3>Stavební materiál</h3>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <ImageWithFallback 
                            src={USERS[0].avatar}
                            alt={USERS[0].name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                          />
                        </div>
                        <span className="text-muted-foreground">1 člen</span>
                        <span className="ml-auto bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                          Vlastník
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span>Položky</span>
                          <span>3 / 15</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>

                      <p className="text-muted-foreground">
                        Vytvořeno: 8. 10. 2025
                      </p>
                    </div>
                  </div>

                  {/* List Card 4 */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-xl transition-all hover:border-blue-300">
                    <div className="flex items-start justify-between mb-4">
                      <h3>Grilovačka</h3>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <ImageWithFallback 
                            src={USERS[0].avatar}
                            alt={USERS[0].name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                          />
                          <ImageWithFallback 
                            src={USERS[1].avatar}
                            alt={USERS[1].name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                          />
                          <ImageWithFallback 
                            src={USERS[2].avatar}
                            alt={USERS[2].name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                          />
                          <ImageWithFallback 
                            src={USERS[3].avatar}
                            alt={USERS[3].name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                          />
                        </div>
                        <span className="text-muted-foreground">4 členové</span>
                        <span className="ml-auto bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                          Vlastník
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span>Položky</span>
                          <span>12 / 18</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                        </div>
                      </div>

                      <p className="text-muted-foreground">
                        Vytvořeno: 1. 6. 2025
                      </p>
                    </div>
                  </div>

                  {/* List Card 5 */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-xl transition-all hover:border-blue-300">
                    <div className="flex items-start justify-between mb-4">
                      <h3>Školní akce</h3>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <ImageWithFallback 
                            src={USERS[3].avatar}
                            alt={USERS[3].name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                          />
                          <ImageWithFallback 
                            src={USERS[0].avatar}
                            alt={USERS[0].name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                          />
                        </div>
                        <span className="text-muted-foreground">2 členové</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span>Položky</span>
                          <span>0 / 6</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>

                      <p className="text-muted-foreground">
                        Vytvořeno: 15. 10. 2025
                      </p>
                    </div>
                  </div>

                  {/* List Card 6 */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-xl transition-all hover:border-blue-300">
                    <div className="flex items-start justify-between mb-4">
                      <h3>Víkendový výlet</h3>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <ImageWithFallback 
                            src={USERS[2].avatar}
                            alt={USERS[2].name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                          />
                          <ImageWithFallback 
                            src={USERS[0].avatar}
                            alt={USERS[0].name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                          />
                          <ImageWithFallback 
                            src={USERS[1].avatar}
                            alt={USERS[1].name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                          />
                        </div>
                        <span className="text-muted-foreground">3 členové</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span>Položky</span>
                          <span>4 / 10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>

                      <p className="text-muted-foreground">
                        Vytvořeno: 13. 10. 2025
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Route 2: Detail seznamu */}
            <TabsContent value="detail" className="mt-8">
              <div className="bg-white rounded-xl shadow-2xl p-8 border-2 border-gray-200">
                {/* Header with back button */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1>Týdenní nákup</h1>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Edit2 className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg ml-auto">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Items Section (2/3 width) */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Filter and Add Item */}
                    <div className="flex items-center justify-between">
                      <div className="inline-flex bg-muted rounded-lg p-1">
                        <button className="px-4 py-2 rounded-md bg-white shadow-sm">
                          Nevyřešené
                        </button>
                        <button className="px-4 py-2 rounded-md text-muted-foreground">
                          Všechny
                        </button>
                      </div>

                      <Button className="gap-2 shadow-md">
                        <Plus className="w-4 h-4" />
                        Přidat položku
                      </Button>
                    </div>

                    {/* Items List */}
                    <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                      <div className="space-y-3">
                        {/* Item 1 - Not resolved */}
                        <div className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all group border border-gray-200">
                          <button className="w-5 h-5 rounded border-2 border-gray-300 hover:border-blue-500 flex items-center justify-center">
                            <Circle className="w-3 h-3 text-gray-300" />
                          </button>
                          <span className="flex-1">Mléko</span>
                          <div className="flex items-center gap-2">
                            <ImageWithFallback 
                              src={USERS[0].avatar}
                              alt={USERS[0].name}
                              className="w-6 h-6 rounded-full object-cover border border-gray-200"
                            />
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>

                        {/* Item 2 - Resolved */}
                        <div className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all group border border-gray-200 opacity-60">
                          <button className="w-5 h-5 rounded border-2 border-green-500 bg-green-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </button>
                          <span className="flex-1 line-through text-muted-foreground">Chléb</span>
                          <div className="flex items-center gap-2">
                            <ImageWithFallback 
                              src={USERS[1].avatar}
                              alt={USERS[1].name}
                              className="w-6 h-6 rounded-full object-cover border border-gray-200"
                            />
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>

                        {/* Item 3 - Not resolved */}
                        <div className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all group border border-gray-200">
                          <button className="w-5 h-5 rounded border-2 border-gray-300 hover:border-blue-500 flex items-center justify-center">
                            <Circle className="w-3 h-3 text-gray-300" />
                          </button>
                          <span className="flex-1">Máslo</span>
                          <div className="flex items-center gap-2">
                            <ImageWithFallback 
                              src={USERS[0].avatar}
                              alt={USERS[0].name}
                              className="w-6 h-6 rounded-full object-cover border border-gray-200"
                            />
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>

                        {/* Item 4 - Not resolved */}
                        <div className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all group border border-gray-200">
                          <button className="w-5 h-5 rounded border-2 border-gray-300 hover:border-blue-500 flex items-center justify-center">
                            <Circle className="w-3 h-3 text-gray-300" />
                          </button>
                          <span className="flex-1">Vajíčka</span>
                          <div className="flex items-center gap-2">
                            <ImageWithFallback 
                              src={USERS[0].avatar}
                              alt={USERS[0].name}
                              className="w-6 h-6 rounded-full object-cover border border-gray-200"
                            />
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>

                        {/* Item 5 - Resolved */}
                        <div className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all group border border-gray-200 opacity-60">
                          <button className="w-5 h-5 rounded border-2 border-green-500 bg-green-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </button>
                          <span className="flex-1 line-through text-muted-foreground">Rajčata</span>
                          <div className="flex items-center gap-2">
                            <ImageWithFallback 
                              src={USERS[1].avatar}
                              alt={USERS[1].name}
                              className="w-6 h-6 rounded-full object-cover border border-gray-200"
                            />
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>

                        {/* Item 6 - Not resolved */}
                        <div className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all group border border-gray-200">
                          <button className="w-5 h-5 rounded border-2 border-gray-300 hover:border-blue-500 flex items-center justify-center">
                            <Circle className="w-3 h-3 text-gray-300" />
                          </button>
                          <span className="flex-1">Brambory</span>
                          <div className="flex items-center gap-2">
                            <ImageWithFallback 
                              src={USERS[1].avatar}
                              alt={USERS[1].name}
                              className="w-6 h-6 rounded-full object-cover border border-gray-200"
                            />
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>

                        {/* Item 7 - Not resolved */}
                        <div className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all group border border-gray-200">
                          <button className="w-5 h-5 rounded border-2 border-gray-300 hover:border-blue-500 flex items-center justify-center">
                            <Circle className="w-3 h-3 text-gray-300" />
                          </button>
                          <span className="flex-1">Sýr</span>
                          <div className="flex items-center gap-2">
                            <ImageWithFallback 
                              src={USERS[0].avatar}
                              alt={USERS[0].name}
                              className="w-6 h-6 rounded-full object-cover border border-gray-200"
                            />
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Members Section (1/3 width) */}
                  <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 h-fit">
                    <h3 className="mb-4">Členové (2)</h3>

                    <div className="space-y-3 mb-6">
                      {/* Owner */}
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <ImageWithFallback 
                          src={USERS[0].avatar}
                          alt={USERS[0].name}
                          className="w-10 h-10 rounded-full object-cover shadow"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="truncate">{USERS[0].name}</p>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                            Vlastník
                          </span>
                        </div>
                      </div>

                      {/* Member */}
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 group hover:bg-gray-50">
                        <ImageWithFallback 
                          src={USERS[1].avatar}
                          alt={USERS[1].name}
                          className="w-10 h-10 rounded-full object-cover shadow"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="truncate">{USERS[1].name}</p>
                          <span className="text-xs text-muted-foreground">
                            Člen
                          </span>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded">
                          <UserMinus className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full gap-2">
                      <UserPlus className="w-4 h-4" />
                      Pozvat člena
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Legenda */}
        <div className="mt-8 p-6 bg-white rounded-xl border-2 border-gray-200">
          <h3 className="mb-4">Funkční elementy wireframu</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="mb-3">Route 1: Přehled seznamů</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Zobrazení všech aktivních seznamů uživatele</li>
                <li>✓ Přepínač mezi aktivními a archivovanými seznamy</li>
                <li>✓ Tlačítko pro vytvoření nového seznamu</li>
                <li>✓ Každá karta zobrazuje členy s fotografiemi</li>
                <li>✓ Progress bar dokončených položek</li>
                <li>✓ Menu pro archivaci/smazání seznamu (vlastník)</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3">Route 2: Detail seznamu</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Tlačítko zpět na přehled</li>
                <li>✓ Úprava názvu seznamu (ikona tužky - vlastník)</li>
                <li>✓ Filtr nevyřešených/všech položek</li>
                <li>✓ Checkbox pro označení položky jako vyřešené</li>
                <li>✓ Avatar uživatele, který položku přidal</li>
                <li>✓ Panel členů s možností jejich odebrání</li>
                <li>✓ Tlačítko pro pozvání nového člena</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
