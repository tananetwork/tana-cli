export class LeaderSelector {
  private validators: string[]  // Sorted list of validator IDs

  constructor(validators: string[]) {
    // Sort deterministically so all validators agree
    this.validators = validators.sort()
  }

  /**
   * Round-robin leader selection based on block height
   * All validators will compute the same result
   */
  getLeaderForHeight(height: number): string {
    const index = height % this.validators.length
    return this.validators[index]!
  }

  isLeader(validatorId: string, height: number): boolean {
    return this.getLeaderForHeight(height) === validatorId
  }

  updateValidators(validators: string[]) {
    this.validators = validators.sort()
    console.log(`[Leader] Updated validator list: ${this.validators.length} validators`)
  }

  getValidatorCount(): number {
    return this.validators.length
  }
}
