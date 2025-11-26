import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

interface CrowdData {
  datetime: string;
  date: string;
  time: string;
  hour: string;
  weekday: string;
  count: string;
  status_label: string;
  status_code: string;
  status_min: string;
  status_max: string;
}

interface PeakQuietTime {
  time: string;
  count: number;
}

export async function GET() {
  try {
    // Read CSV file from the external directory
    const csvPath = '/Users/i_kawano/Documents/crowd_data_dashboard_v2/public/fit_place24_data.csv';

    if (!fs.existsSync(csvPath)) {
      return NextResponse.json({ error: 'Data file not found' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    const records: CrowdData[] = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    // Validate data exists
    if (!records || records.length === 0) {
      return NextResponse.json({ error: 'No data records found' }, { status: 404 });
    }

    // Calculate statistics
    const totalRecords = records.length;

    // Calculate date range with validation
    const dates = records.map((r) => r.date).filter((date) => date && date.trim() !== '');
    if (dates.length === 0) {
      return NextResponse.json({ error: 'No valid dates found in data' }, { status: 400 });
    }
    const startDate = dates[0];
    const endDate = dates[dates.length - 1];

    // Validate dates are valid
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      return NextResponse.json({ error: 'Invalid date format in data' }, { status: 400 });
    }

    // Calculate average crowd with validation
    const counts = records
      .map((r) => {
        const count = parseInt(r.count, 10);
        return isNaN(count) ? 0 : count;
      })
      .filter((count) => count >= 0);

    if (counts.length === 0) {
      return NextResponse.json({ error: 'No valid count data found' }, { status: 400 });
    }

    const averageCrowd = Math.round(counts.reduce((sum, count) => sum + count, 0) / counts.length);

    // Find peak time (max crowd) with validation
    let maxCount = 0;
    let peakTime: PeakQuietTime = { time: '', count: 0 };

    records.forEach((record) => {
      const count = parseInt(record.count, 10);
      if (!isNaN(count) && count > maxCount) {
        maxCount = count;
        const weekday = record.weekday || 'Unknown';
        const time = record.time ? record.time.substring(0, 5) : '00:00';
        peakTime = {
          time: `${weekday} ${time}`,
          count: count,
        };
      }
    });

    // Find quiet time (min crowd) with validation
    let minCount = Infinity;
    let quietTime: PeakQuietTime = { time: '', count: 0 };

    records.forEach((record) => {
      const count = parseInt(record.count, 10);
      if (!isNaN(count) && count < minCount) {
        minCount = count;
        const weekday = record.weekday || 'Unknown';
        const time = record.time ? record.time.substring(0, 5) : '00:00';
        quietTime = {
          time: `${weekday} ${time}`,
          count: count,
        };
      }
    });

    // Calculate system uptime
    // Expected records: hourly collection
    const hoursDiff = (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60);
    const expectedRecords = Math.max(1, Math.ceil(hoursDiff)); // Ensure at least 1 to avoid division by zero
    const uptimePercentage = (totalRecords / expectedRecords) * 100;
    // Cap at 100% and round to 1 decimal place
    const systemUptime = Math.min(100, Math.max(0, Math.round(uptimePercentage * 10) / 10));

    // Calculate operation duration in months
    const monthsDiff = (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
    const operationDurationMonths = Math.max(0, Math.round(monthsDiff * 10) / 10);

    // Calculate crowdedness comparison
    // Find time slots that are at least 1.5x the average
    const averageCrowdValue = counts.reduce((sum, count) => sum + count, 0) / counts.length;
    let maxMultiplier = 0;
    let crowdednessComparison = { time: '', multiplier: 0 };

    // Only calculate if average is greater than 0 to avoid division by zero
    if (averageCrowdValue > 0) {
      records.forEach((record) => {
        const count = parseInt(record.count, 10);
        if (!isNaN(count) && count > 0) {
          const multiplier = count / averageCrowdValue;
          if (multiplier >= 1.5 && multiplier > maxMultiplier) {
            maxMultiplier = multiplier;
            const weekday = record.weekday || 'Unknown';
            const time = record.time ? record.time.substring(0, 5) : '00:00';
            crowdednessComparison = {
              time: `${weekday} ${time}`,
              multiplier: Math.round(multiplier * 10) / 10,
            };
          }
        }
      });

      // Fallback: if no time slot is 1.5x the average, use the peak time
      if (crowdednessComparison.multiplier === 0 && peakTime.count > 0) {
        const peakMultiplier = peakTime.count / averageCrowdValue;
        crowdednessComparison = {
          time: peakTime.time,
          multiplier: Math.max(1.0, Math.round(peakMultiplier * 10) / 10),
        };
      }
    }

    // Final fallback: if still no valid comparison, use default values
    if (crowdednessComparison.multiplier === 0) {
      crowdednessComparison = {
        time: peakTime.time || 'Unknown 00:00',
        multiplier: 1.0,
      };
    }

    return NextResponse.json({
      totalRecords,
      dateRange: `${startDate} - ${endDate}`,
      averageCrowd,
      peakTime: {
        time: peakTime.time,
        count: peakTime.count,
      },
      quietTime: {
        time: quietTime.time,
        count: quietTime.count,
      },
      systemUptime,
      operationDurationMonths,
      crowdednessComparison,
    });
  } catch (error) {
    console.error('Error processing gym data:', error);
    return NextResponse.json({ error: 'Failed to process data' }, { status: 500 });
  }
}
