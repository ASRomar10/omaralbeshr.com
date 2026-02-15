import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Get the secret and paths from the request body
    const body = await request.json()
    const { secret, paths } = body

    // Check secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Validate paths
    if (!paths || !Array.isArray(paths) || paths.length === 0) {
      return NextResponse.json(
        { message: 'No paths provided' },
        { status: 400 }
      )
    }

    // Revalidate each path
    for (const path of paths) {
      if (typeof path === 'string') {
        revalidatePath(path)
      }
    }

    return NextResponse.json({
      revalidated: true,
      paths,
      now: Date.now(),
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}
