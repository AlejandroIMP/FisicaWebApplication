import { describe, it, expect, vi } from 'vitest';
import { convertToBaseUnit, convertFromBaseUnit } from '../unit-converter/unit-converter';
import { conversionFactors } from '../unit-converter/conversion-factors';

// Mock conversion factors
vi.mock('../unit-converter/conversion-factors', () => ({
	conversionFactors: {
		radius: {
			'm': 1,
			'km': 1000,
			'mi': 1609.34,
		},
		angularVelocity: {
			'rad/s': 1,
			'rpm': 0.10472
		}
	}
}));

describe('Unit Converter', () => {
	describe('convertToBaseUnit', () => {
		it('should convert values to base units correctly', () => {
			expect(convertToBaseUnit(5, 'radius', 'km')).toBe(5000);
			expect(convertToBaseUnit(2, 'radius', 'mi')).toBeCloseTo(3218.68);
			expect(convertToBaseUnit(60, 'angularVelocity', 'rpm')).toBeCloseTo(6.2832);
		});

		it('should return original value when unit is not specified', () => {
			expect(convertToBaseUnit(5, 'radius', '')).toBe(5);
		});

		it('should return original value when type has no conversion factors', () => {
			expect(convertToBaseUnit(5, 'nonExistentType' as any, 'km')).toBe(5);
		});

		it('should return original value when unit is not found in conversion factors', () => {
			expect(convertToBaseUnit(5, 'radius', 'nonExistentUnit')).toBe(5);
		});
	});

	describe('convertFromBaseUnit', () => {
		it('should convert values from base units correctly', () => {
			expect(convertFromBaseUnit(5000, 'radius', 'km')).toBe(5);
			expect(convertFromBaseUnit(1609.34, 'radius', 'mi')).toBeCloseTo(1);
			expect(convertFromBaseUnit(1, 'angularVelocity', 'rpm')).toBeCloseTo(9.5493);
		});

		it('should return original value when unit is not specified', () => {
			expect(convertFromBaseUnit(5, 'radius', '')).toBe(5);
		});

		it('should return original value when type has no conversion factors', () => {
			expect(convertFromBaseUnit(5, 'nonExistentType' as any, 'km')).toBe(5);
		});

		it('should return original value when unit is not found in conversion factors', () => {
			expect(convertFromBaseUnit(5, 'radius', 'nonExistentUnit')).toBe(5);
		});
	});
});