import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const specificKey = searchParams.get('key');

  // If a specific key is requested
  if (specificKey) {
    const value = process.env[specificKey];
    return NextResponse.json({
      key: specificKey,
      exists: !!value,
      value: value ? `${value.substring(0, 3)}... (length: ${value.length})` : null,
    });
  }

  // Otherwise list all (masked)
  const envVars = Object.keys(process.env).sort().reduce((acc, key) => {
    const value = process.env[key];
    acc[key] = {
      exists: !!value,
      preview: value ? `${value.substring(0, 3)}...` : null,
      length: value ? value.length : 0,
    };
    return acc;
  }, {} as Record<string, any>);

  return NextResponse.json({
    count: Object.keys(envVars).length,
    variables: envVars
  });
}
