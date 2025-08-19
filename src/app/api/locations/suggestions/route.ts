import { NextRequest, NextResponse } from "next/server";
import { LocationSuggestion } from "@/types/property";

// Mock location database - replace with actual database or Google Places API
const mockLocations: LocationSuggestion[] = [
  // Projects
  { id: "proj1", name: "Mont Kiara", type: "project", displayName: "Mont Kiara, Kuala Lumpur" },
  { id: "proj2", name: "Bangsar South", type: "project", displayName: "Bangsar South, Kuala Lumpur" },
  { id: "proj3", name: "KL Sentral", type: "project", displayName: "KL Sentral, Kuala Lumpur" },
  { id: "proj4", name: "Damansara Heights", type: "project", displayName: "Damansara Heights, Kuala Lumpur" },
  { id: "proj5", name: "Taman Tun Dr Ismail", type: "project", displayName: "Taman Tun Dr Ismail, Kuala Lumpur" },
  { id: "proj6", name: "Sri Hartamas", type: "project", displayName: "Sri Hartamas, Kuala Lumpur" },
  { id: "proj7", name: "Cyberjaya", type: "project", displayName: "Cyberjaya, Selangor" },
  { id: "proj8", name: "Putrajaya", type: "project", displayName: "Putrajaya, Malaysia" },
  
  // Neighborhoods
  { id: "neigh1", name: "KLCC", type: "neighborhood", displayName: "KLCC, Kuala Lumpur" },
  { id: "neigh2", name: "Bukit Bintang", type: "neighborhood", displayName: "Bukit Bintang, Kuala Lumpur" },
  { id: "neigh3", name: "Bangsar", type: "neighborhood", displayName: "Bangsar, Kuala Lumpur" },
  { id: "neigh4", name: "Ampang", type: "neighborhood", displayName: "Ampang, Kuala Lumpur" },
  { id: "neigh5", name: "Cheras", type: "neighborhood", displayName: "Cheras, Kuala Lumpur" },
  { id: "neigh6", name: "Kepong", type: "neighborhood", displayName: "Kepong, Kuala Lumpur" },
  { id: "neigh7", name: "Segambut", type: "neighborhood", displayName: "Segambut, Kuala Lumpur" },
  { id: "neigh8", name: "Setapak", type: "neighborhood", displayName: "Setapak, Kuala Lumpur" },
  { id: "neigh9", name: "Mid Valley", type: "neighborhood", displayName: "Mid Valley, Kuala Lumpur" },
  { id: "neigh10", name: "Bangsar Baru", type: "neighborhood", displayName: "Bangsar Baru, Kuala Lumpur" },
  { id: "neigh11", name: "Taman Desa", type: "neighborhood", displayName: "Taman Desa, Kuala Lumpur" },
  { id: "neigh12", name: "Old Klang Road", type: "neighborhood", displayName: "Old Klang Road, Kuala Lumpur" },
  { id: "neigh13", name: "Petaling Jaya", type: "neighborhood", displayName: "Petaling Jaya, Selangor" },
  { id: "neigh14", name: "Subang Jaya", type: "neighborhood", displayName: "Subang Jaya, Selangor" },
  { id: "neigh15", name: "Shah Alam", type: "neighborhood", displayName: "Shah Alam, Selangor" },
  
  // Cities
  { id: "city1", name: "Kuala Lumpur", type: "city", displayName: "Kuala Lumpur, Malaysia" },
  { id: "city2", name: "Petaling Jaya", type: "city", displayName: "Petaling Jaya, Selangor" },
  { id: "city3", name: "Shah Alam", type: "city", displayName: "Shah Alam, Selangor" },
  { id: "city4", name: "Subang Jaya", type: "city", displayName: "Subang Jaya, Selangor" },
  { id: "city5", name: "Putrajaya", type: "city", displayName: "Putrajaya, Malaysia" },
  { id: "city6", name: "Cyberjaya", type: "city", displayName: "Cyberjaya, Selangor" },
  { id: "city7", name: "Klang", type: "city", displayName: "Klang, Selangor" },
  { id: "city8", name: "Kajang", type: "city", displayName: "Kajang, Selangor" },
  { id: "city9", name: "Seremban", type: "city", displayName: "Seremban, Negeri Sembilan" },
  { id: "city10", name: "Nilai", type: "city", displayName: "Nilai, Negeri Sembilan" },
  
  // Popular areas
  { id: "area1", name: "Mid Valley", type: "neighborhood", displayName: "Mid Valley, Kuala Lumpur" },
  { id: "area2", name: "Sunway", type: "neighborhood", displayName: "Sunway, Petaling Jaya" },
  { id: "area3", name: "Cyberjaya", type: "city", displayName: "Cyberjaya, Selangor" },
  { id: "area4", name: "Bangsar Baru", type: "neighborhood", displayName: "Bangsar Baru, Kuala Lumpur" },
  { id: "area5", name: "Sri Hartamas", type: "neighborhood", displayName: "Sri Hartamas, Kuala Lumpur" },
  { id: "area6", name: "Taman Tun Dr Ismail", type: "neighborhood", displayName: "Taman Tun Dr Ismail, Kuala Lumpur" },
  { id: "area7", name: "Damansara Heights", type: "neighborhood", displayName: "Damansara Heights, Kuala Lumpur" },
  { id: "area8", name: "Taman Desa", type: "neighborhood", displayName: "Taman Desa, Kuala Lumpur" },
  { id: "area9", name: "Old Klang Road", type: "neighborhood", displayName: "Old Klang Road, Kuala Lumpur" },
  { id: "area10", name: "Setia Alam", type: "neighborhood", displayName: "Setia Alam, Shah Alam" },
  { id: "area11", name: "Bandar Sunway", type: "neighborhood", displayName: "Bandar Sunway, Petaling Jaya" },
  { id: "area12", name: "USJ", type: "neighborhood", displayName: "USJ, Subang Jaya" },
  { id: "area13", name: "Puchong", type: "neighborhood", displayName: "Puchong, Selangor" },
  { id: "area14", name: "Kota Damansara", type: "neighborhood", displayName: "Kota Damansara, Petaling Jaya" },
  { id: "area15", name: "Ara Damansara", type: "neighborhood", displayName: "Ara Damansara, Petaling Jaya" }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '10');
    const type = searchParams.get('type'); // 'project', 'neighborhood', 'city', or all

    if (!query || query.length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    const filteredLocations = mockLocations.filter(location => {
      const matchesQuery = location.name.toLowerCase().includes(query.toLowerCase()) ||
                          location.displayName.toLowerCase().includes(query.toLowerCase());
      
      if (type && type !== 'all') {
        return matchesQuery && location.type === type;
      }
      
      return matchesQuery;
    });

    // Sort by relevance (exact matches first, then by type priority)
    filteredLocations.sort((a, b) => {
      // Exact name match gets highest priority
      const aExactMatch = a.name.toLowerCase() === query.toLowerCase() ? 3 : 0;
      const bExactMatch = b.name.toLowerCase() === query.toLowerCase() ? 3 : 0;
      
      if (aExactMatch !== bExactMatch) {
        return bExactMatch - aExactMatch;
      }

      // Then by type priority (project > neighborhood > city)
      const typePriority = { project: 3, neighborhood: 2, city: 1 };
      const aPriority = typePriority[a.type];
      const bPriority = typePriority[b.type];
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }

      // Finally by alphabetical order
      return a.name.localeCompare(b.name);
    });

    // Limit results
    const suggestions = filteredLocations.slice(0, limit);

    return NextResponse.json({ suggestions });
    
  } catch (error) {
    console.error("Location suggestions error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// For future integration with Google Places API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    // This would integrate with Google Places API
    // For now, return mock data
    const suggestions = mockLocations
      .filter(loc => loc.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 10);

    return NextResponse.json({ suggestions });
    
  } catch (error) {
    console.error("Google Places API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 